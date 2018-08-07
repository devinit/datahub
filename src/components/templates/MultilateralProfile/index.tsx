import * as React from 'react';
import { Div } from 'glamorous';
import { Container } from 'semantic-ui-react';
import Generic from '../Generic';

declare const OLD_DATAHUB_URL: string;

interface Props {
  id: string;
}
export default ({ id }: Props) =>
  (<Generic>
    <Div paddingTop="0em">
      <Container>
        <iframe
          title="oda-donor"
          src={ `${OLD_DATAHUB_URL}/#!/multilateral/${id}` }
          frameBorder="0"
          scrolling="no"
          style={ { width: '100%', height: '3560px' } }
        />
      </Container>
    </Div>
  </Generic>);
