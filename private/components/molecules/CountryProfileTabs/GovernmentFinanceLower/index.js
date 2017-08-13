// @flow
import { Container, Header, Grid, Divider } from 'semantic-ui-react';
import {Div} from 'glamorous';
import React from 'react';
import {Lead} from 'components/atoms/BodyText';
import ExportChart from 'components/molecules/ExportChart';

type Props = {
  children: any,
  countryName: string
};

const Government = (props: Props) =>
  (<Container>
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={8} textAlign="center">
          <Lead>
            How does {props.countryName} finance and spend its budget?
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
    <Div paddingTop="2em" paddingBottom="2em" >
      <ExportChart />
      <Container>
        {props.children}
      </Container>
    </Div>
  </Container>);

export default Government;
