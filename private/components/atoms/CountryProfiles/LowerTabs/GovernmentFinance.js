import { Container, Header, Grid } from 'semantic-ui-react';
import glamorous from 'glamorous';
import React from 'react';
import {LightBg} from '../Common';

export const Lead = glamorous.span({
  fontSize: '1.5rem',
  fontWeight: '300',
  textAlign: 'center',
  '& span': {
    paddingRight: '2px',
    paddingLeft: '2px',
    fontWeight: '600',
  }
});
const Government = () => (
  <LightBg>
    <Container>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8} textAlign="center">
            <Lead>
              How does Uganda finance and spend its budget?
                <span>Move the year slider</span>or <span>click a box</span> to drill down.
            </Lead>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} textAlign="center">
            <Header as="h2">Government revenue, financing and expenditure</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </LightBg>
);

export default Government;
