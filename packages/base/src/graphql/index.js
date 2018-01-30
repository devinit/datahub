/**
 * Generates union introspection graphql fragment file
 */
import { config } from 'package.json';
import fetch from 'isomorphic-fetch';
import fs from 'fs-extra';

fetch(config.api, {
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
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );
    result.data.__schema.types = filteredData; // eslint-disable-line
    const filePath = 'private/lib/graphql/fragmentTypes.json';
    fs.writeFile(filePath, JSON.stringify(result.data))
      .then(() => console.info('Fragment types successfully extracted!'))
      .catch(console.error);
  });
