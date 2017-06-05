// This file is not transpiled by babel, so no flow
/**
 * Gets semantic theme variables and site variables and merges them together
 * out puts the results as es6 exports in one file
 */
const path = require('path');
const fs = require('fs-extra');
const config = require('../../semantic.json');
const R = require('ramda');
const prettier = require('prettier');

const sitePath = path.resolve(config.base, config.paths.source.site);

const themesPath = path.resolve(config.base, config.paths.source.themes);

const defauWhiteltList = ['Sizes', 'Site Colors'];

const getGroupsNames = (lines) => {
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
    if (index < groupNames.length - 1) nextRegex = new RegExp(`^\\s+${groupNames[index + 1]}`, 'gm');
    lines.forEach(line => {
      if (shouldGetLines) acc[name].push(line);
      if (currentRegex.test(line)) shouldGetLines = true;
      if (nextRegex && nextRegex.test(line)) shouldGetLines = false;
    });
    return acc;
  }, {});
}); // [ {font: []}, {brand: []}]

const getSiteAndThemeGroupVars = (groups) =>
  R.compose(R.map(getGroupsVariables(groups)), R.map(R.split('\n')));

const shouldTakeSiteLine = (themeLine, siteLine) => {
  const siteVarName = siteLine.split(':')[0];
  const themeVarName = themeLine.split(':')[0];
  return siteVarName === themeVarName;
};

const getCleanLines = (linesObject) =>
  R.keys(linesObject)
    .reduce((acc, key) => {
      const linesArr = linesObject[key]
        .map(line => line.replace(/\s+/g, '')
                          .replace(/;/g, '')
                          .replace(/\\/g, ''))
        .filter(line => line[0] === '@');
      return Object.assign(acc, {[key]: linesArr});
    }, {});

const getWhiteListedGroups = R.curry((whiteListed, varGroups) =>
  whiteListed.reduce((acc, wantedGroup) => {
    return Object.assign(acc, {[wantedGroup]: varGroups[wantedGroup]});
  }, {}));

const mergeSiteAndGroupVars = ([theme, site]) =>
  R.keys(site).reduce((acc, key) => {
    const siteGroup = site[key];
    const themeGroup = theme[key];
    const groupVals = themeGroup
      .map(themeLine => {
        const replacementLine = siteGroup
          .find(siteLine => shouldTakeSiteLine(themeLine, siteLine));
        return replacementLine || themeLine;
      });
    return Object.assign(acc, {[key]: groupVals});
  }, {});

const getWantedVariableLines = (themeVarsRaw, siteVarsRaw, whiteListed) => {
  const allGroupNames = R.compose(getGroupsNames, R.split('\n'))(themeVarsRaw);
  const siteAndThemeGroupVars =
    getSiteAndThemeGroupVars(allGroupNames)([themeVarsRaw, siteVarsRaw]);
  const getWantedGroupVars = getWhiteListedGroups(whiteListed); // its a curryed function
  const whiteListedGroups = R.map(getWantedGroupVars, siteAndThemeGroupVars);
  const cleanedLines = R.map(getCleanLines, whiteListedGroups);
  const mergedVars = mergeSiteAndGroupVars(cleanedLines);
  return mergedVars;
};

const lineToJson = line => {
  const arr = line.split(':');
  const key = arr[0].replace('@', '');
  const value = JSON.stringify(arr[1]);
  return { name: key, value };
};

const groupsToJsLines = (variableGroups) =>
  R.keys(variableGroups)
    .map(groupNName => R.map(lineToJson, variableGroups[groupNName]));

const jsonToEs6 = R.reduce((acc, JsLineObj) =>
  `${acc} \n export const ${JsLineObj.name} = ${JsLineObj.value};`,
  '// This file is auto generated from semantic less variable globals \n');

const writeToFile = content =>
  fs.writeFile('./private/components/theme/semantic.js',
    prettier.format(content, {singleQuote: true}));

const run = R.compose(writeToFile, jsonToEs6, R.flatten, groupsToJsLines);

// whiteList represents the type of global variables we want to extract
// theme is the theme we are extracting from
const main = async (theme = 'default', whiteList = []) => {
  const userWhiteList = whiteList.concat(defauWhiteltList);
  const themeVarsRaw = await fs.readFile(
    path.resolve(themesPath, theme, 'globals/site.variables'),
    'utf8'
    );
  const siteVarsRaw = await fs.readFile(path.resolve(sitePath, 'globals/site.variables'), 'utf8');
  const variableLines = getWantedVariableLines(themeVarsRaw, siteVarsRaw, userWhiteList);
  return run(variableLines)
    .then(() => console.log('success!'))
    .catch((error) => console.error(error));
};

if (process.env.NODE_ENV !== 'test') main();

module.exports = {
  getWantedVariableLines,
  getSiteAndThemeGroupVars,
  getGroupsNames,
  lineToJson,
  getGroupsVariables
};
