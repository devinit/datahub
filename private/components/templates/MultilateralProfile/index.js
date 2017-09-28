// @flow
import React from 'react';
import { Div } from 'glamorous';
import { Container } from 'semantic-ui-react';
import Generic from '../Generic';
/* eslint-disable max-len */

type Props = {
  id: string
}
export default ({id}: Props) =>
  (<Generic pathname="/oda-donor">
    <Div paddingTop="5em">
      <Container>
        <iframe
          title="oda-donor"
          src={id === '/oda-donor' ?
            'http://localhost:5000/#!/post/oda-donor' :
            'http://localhost:5000/#!/post/poverty'
          }
          frameBorder="0"
          scrolling="no"
          style={{ width: '100%', height: '850px' }}
        />
      </Container>
    </Div>
  </Generic>);
