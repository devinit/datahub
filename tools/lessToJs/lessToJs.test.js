import path from 'path';
import fs from 'fs-extra';
import lessToJs from '.';

describe('semantic global less to ES6', () => {
  let lines = [];
  let lessTheme = null;
  let lessSite = null;
  beforeAll(async () => {
    try {
      lessSite = await fs.readFile(path.resolve(__dirname, 'data/semantic.site.less'), 'utf8');
      lessTheme = await fs.readFile(path.resolve(__dirname, 'data/semantic.theme.less'), 'utf8');
      lines = lessTheme.split('\n');
    } catch (err) {
      console.error(err);
    }
  });
  it('should return all global variable group names', () => {
    const groups = lessToJs.getGroupsNames(lines);
    expect(groups.length).toBeGreaterThan(2);
  });
  it('should return variables in each group', () => {
    const groups = lessToJs.getGroupsNames(lines);
    const groupsVars = lessToJs.getGroupsVariables(groups, lines);
    expect(groupsVars.Fonts.length).toBeGreaterThan(2);
  });
  it('should get all themes and sites global variables', () => {
    const groupNames = lessToJs.getGroupsNames(lines);
    const siteAndThemeGroupVars =
      lessToJs.getSiteAndThemeGroupVars(groupNames)([lessTheme, lessSite]);
    expect(siteAndThemeGroupVars.length).toBe(2);
    expect(siteAndThemeGroupVars[1].Fonts.length).toBeGreaterThan(2);
  });
  it('should get required whiteListed variable lines', () => {
    const wantedLines = lessToJs.getWantedVariableLines(lessTheme, lessSite, ['Border Radius', 'Brand Colors']);
    const wantedAllLines = lessToJs.getWantedVariableLines(lessTheme, lessSite, []);
    expect(wantedLines).toBeDefined();
    expect(wantedAllLines).toBeDefined();
  });
  it('should turn less JS variable objects to css classes i.e styles and evaluate them', async () => {
    const lessVars = [
      { name: 'miniSize', value: '(11/14)' },
      { name: 'tinySize', value: '(12/14)' },
      { name: 'green', value: '#21BA45' },
      { name: 'darkgreen', value: 'darken(@green,5)' },
    ];
    const lessStyles = lessToJs.lessVarJsObjsToCss(lessVars);
    const evaluated = await lessToJs.evaluateToCssClasses(lessStyles);
    expect(lessStyles).toBeDefined();
    expect(lessStyles.split('\n').length).toBeGreaterThan(3);
    expect(evaluated).toBeDefined();
  });
  it('should turn css into an array of JsObjects', () => {
    const css = `
      .tinySize {
        value: 0.85714286;
      }
      .green {
        value: #21BA45;
      }
      .darkgreen {
        value: #1da43d;
      }`;
    const json = lessToJs.evaluatedClassesToJsObjs(css);
    expect(json[1].name).toBe('green');
  });
});
