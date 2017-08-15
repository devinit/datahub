/**
 * Gets semantic theme variables and site variables and merges them together
 * out puts the results as es6 exports in one file
 */
import path from 'path';
import fs from 'fs-extra';
import R from 'ramda';
import less from 'less';
import prettier from 'prettier';
import cssToJsObject from 'css-to-js-object';
import config from '../../semantic.json';

const sitePath = path.resolve(config.base, config.paths.source.site);

const themesPath = path.resolve(config.base, config.paths.source.themes);

const getGroupsNames = lines => {
  const regex = new RegExp(/^\s+\w.*/, 'gm');
  const filterGroups = R.filter(line => regex.test(line) && line.trim().split(/\s/g).length < 3);
  return R.compose(R.map(line => line.trim()), R.drop(1), filterGroups)(lines);
};

const getGroupsVariables = R.curry((groupNames, lines) => {
  return groupNames.reduce((acc, name, index) => {
    let shouldGetLines = false;
    acc[name] = [];
    const currentRegex = new RegExp(`^\\s+${name}`, 'gm');
    let nextRegex = null;
    if (index < groupNames.length - 1) { nextRegex = new RegExp(`^\\s+${groupNames[index + 1]}`, 'gm'); }
    lines.forEach(line => {
      if (shouldGetLines) acc[name].push(line);
      if (currentRegex.test(line)) shouldGetLines = true;
      if (nextRegex && nextRegex.test(line)) shouldGetLines = false;
    });
    return acc;
  }, {});
});

const getSiteAndThemeGroupVars = groups =>
  R.compose(R.map(getGroupsVariables(groups)), R.map(R.split('\n')));

const shouldTakeSiteLine = (themeLine, siteLine) => {
  const siteVarName = siteLine.split(':')[0];
  const themeVarName = themeLine.split(':')[0];
  return siteVarName === themeVarName;
};

const getCleanLines = linesObject =>
  R.keys(linesObject).reduce((acc, key) => {
    const linesArr = linesObject[key]
      .filter(line => line.includes(';'))
      .filter(line => !line.includes('~'))
      .map(line => line.replace(/\s+/g, '').replace(/;/g, '').replace(/\\/g, ''))
      .filter(line => line[0] === '@' && !Number(line[1]));
    return Object.assign(acc, { [key]: linesArr });
  }, {});

const getWhiteListedGroups = R.curry((whiteListed, varGroups) =>
  whiteListed.reduce((acc, wantedGroup) => {
    return Object.assign(acc, { [wantedGroup]: varGroups[wantedGroup] });
  }, {}),
);

const mergeSiteAndGroupVars = ([theme, site]) =>
  R.keys(site).reduce((acc, key) => {
    const siteGroup = site[key];
    const themeGroup = theme[key];
    const groupVals = themeGroup.map(themeLine => {
      const replacementLine = siteGroup.find(siteLine => shouldTakeSiteLine(themeLine, siteLine));
      return replacementLine || themeLine;
    });
    return Object.assign(acc, { [key]: groupVals });
  }, {});

const getWantedVariableLines = (themeVarsRaw, siteVarsRaw, whiteListed = [], blackListed = []) => {
  const allGroupNames = R.compose(getGroupsNames, R.split('\n'))(themeVarsRaw);
  const effectiveGroupnames = allGroupNames.filter(name => !blackListed.includes(name));
  let siteAndThemeGroupVars = getSiteAndThemeGroupVars(effectiveGroupnames)([
    themeVarsRaw,
    siteVarsRaw,
  ]);
  if (whiteListed.length) {
    const getWantedGroupVars = getWhiteListedGroups(whiteListed); // its a curryed function
    siteAndThemeGroupVars = R.map(getWantedGroupVars, siteAndThemeGroupVars);
  }
  const cleanedLines = R.map(getCleanLines, siteAndThemeGroupVars);
  const mergedVars = mergeSiteAndGroupVars(cleanedLines);
  return mergedVars;
};

const lessVarLineToJsObj = line => {
  const arr = line.split(':');
  const key = arr[0].replace('@', '');
  const value = arr[1]
    .replace(/"/g, '') // remove quotes
    .replace(/\/\/+.*/, ''); // remove comments
  return { name: key, value };
};

const varGroupsToJsObjs = variableGroups =>
  R.keys(variableGroups).map(groupNName => R.map(lessVarLineToJsObj, variableGroups[groupNName]));

// functions below evaluates less variables to evaluated css and back to js objects
// this code came as an after thought and it could better be organised
// this hack that turns less variables into css classes with an evaluated value property

const lessVarJsObjsToCss = R.reduce((styles, lessVarObj) => {
  const styleVar = `@${lessVarObj.name}:${lessVarObj.value};`;
  return `${styles}\n${styleVar}\n.${lessVarObj.name} {value:${lessVarObj.value}}\n`;
}, '');

const evaluateToCssClasses = styles =>
  new Promise((resolve, reject) => {
    less.render(styles, { fileName: 'logs.less' }, (err, output) => {
      output ? resolve(output.css) : resolve('output error');
      if (err) console.log('less evaluation error: ', err);
      reject(err);
    });
  });

const evaluatedClassesToJsObjs = css => {
  const cssJson = cssToJsObject(css);
  return R.keys(cssJson).map(cssClass => ({
    name: cssClass.substring(1),
    value: cssJson[cssClass].value,
  }));
};

const jsObjToEs6 = R.reduce(
  (acc, JsLineObj) =>
    `${acc} \n export const ${JsLineObj.name} = ${JSON.stringify(JsLineObj.value)};`,
  '// This file is auto generated from semantic less variable globals \n',
);

const writeToFile = content =>
  fs.writeFile(
    './private/components/theme/semantic.js',
    prettier.format(content, { singleQuote: true }),
  );

const processToUnevalutedCss = R.compose(lessVarJsObjsToCss, R.flatten, varGroupsToJsObjs);

const run = R.composeP(writeToFile, jsObjToEs6, evaluatedClassesToJsObjs, evaluateToCssClasses);

// theme is the theme we are extracting from, its values are merged with the site
// whiteList represents the type of global variables we want to extract
// and the returned results will only contain those results
// blacklist is for when you have nothing whitelisted and you want to exclude some groups
const main = async ({ theme = 'default', whiteList = [], blackList = [] }) => {
  const themeVarsRaw = await fs.readFile(
    path.resolve(themesPath, theme, 'globals/site.variables'),
    'utf8',
  );
  const siteVarsRaw = await fs.readFile(path.resolve(sitePath, 'globals/site.variables'), 'utf8');
  const variableLines = getWantedVariableLines(themeVarsRaw, siteVarsRaw, whiteList, blackList);
  const lessStyles = processToUnevalutedCss(variableLines);
  // console.log(lessStyles);
  return run(lessStyles).then(() => console.log('success!')).catch(error => console.error(error));
};
// TODO: make CLI
// pass in a theme and the types of global variables you want to capture
// The type of global variables we are capturing by default
if (process.env.NODE_ENV !== 'test') {
  main({
    whiteList: ['Site Colors', 'Brand Colors'],
  });
}

module.exports = {
  getWantedVariableLines,
  getSiteAndThemeGroupVars,
  getGroupsNames,
  lessVarJsObjsToCss,
  evaluateToCssClasses,
  evaluatedClassesToJsObjs,
  getGroupsVariables,
};
