import { Container, Header, Grid, Divider } from 'semantic-ui-react';
import * as React from 'react';
import {Lead} from '../../../atoms/Text';
import {PageUnit} from '../../../types';
import {getPageUnitById} from '../../../pageData';

export interface Props  {
  children: any;
  countryName: string;
  pageData: PageUnit[];
}

const Government = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const textBlockA1 = getPageLine('govt-finance-lower');
  return (<div>
    <Container>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8} textAlign="center">
            <Lead>
              {textBlockA1 ? textBlockA1.title : ''}
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
      <Divider />
    </Container>
    {props.children}
  </div>);
};

export default Government;
