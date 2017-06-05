const lessToJs = require('./lessToJs');
const path = require('path');
const fs = require('fs-extra');

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
  it('should get required variable lines', () => {
    const wantedLines = lessToJs.getWantedVariableLines(lessTheme, lessSite, ['Fonts', 'Brand Colors']);
    console.log(wantedLines);
    expect(wantedLines).toBeDefined();
  });
});
