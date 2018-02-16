import * as React from 'react';
import { Div } from 'glamorous';
import {process} from '@devinit/dh-base/lib/types';
import { Container } from 'semantic-ui-react';
import Generic from '../Generic';

interface Props  {
  id: string;
}
export default ({id}: Props) =>
  (<Generic pathname="/multilateral">
    <Div paddingTop="0em">
      <Container>
        <iframe
          title="oda-donor"
          src={`${process.env.config.old_datahub}/#!/multilateral/${id}`}
          frameBorder="0"
          scrolling="no"
          style={{ width: '100%', height: '3560px' }}
        />
      </Container>
    </Div>
  </Generic>);
