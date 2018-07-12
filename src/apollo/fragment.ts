/**
 * Generates union introspection graphql fragment file
 */
import * as fetch from 'isomorphic-fetch';
import * as fs from 'fs-extra';
const packageJson = require('../../package.json');

const main = (): void => {
  fetch(packageJson.config.API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `
    })
  })
    .then(result => result.json())
    .then(result => {
      // here we're filtering out any type information unrelated to unions or interfaces
      const filteredData = result.data.__schema.types.filter(
        type => type.possibleTypes !== null
      );
      result.data.__schema.types = filteredData; // eslint-disable-line
      const filePath = 'src/apollo/fragmentTypes.json';

      fs.writeFile(filePath, JSON.stringify(result.data, null, 4))
        .then(() => console.info('Fragment types successfully extracted!'))
        .catch(console.error);
    });
};

main();
