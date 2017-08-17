// @flow
import { Container, Header, Grid, Divider, Segment } from 'semantic-ui-react';
import {Div} from 'glamorous';
import React from 'react';
import {Lead} from 'components/atoms/BodyText';
import {PrintContainer} from 'components/atoms/Container';
import type {PageUnit} from 'components/organisms/PagesData';
import {getPageUnitById} from 'components/organisms/PagesData';

type Props = {
  children: any,
  countryName: string,
  pageData: PageUnit[]
};

const Government = (props: Props) => {
  const getPageLine = getPageUnitById(props.pageData);
  const textBlockA1 = getPageLine('govt-finance-lower');
  return (<Container>
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
    <Div paddingTop="2em" paddingBottom="2em" >
      <Container id="print-chart">
        <PrintContainer>
          <Segment textAlign="center" vertical>
            <img src="/img/print-logo.jpg" alt="Development Initiatives" height="50" width="132" />
            <Header>
              <Header.Content as="h2">Domestic public resources in Uganda</Header.Content>
              <Header.Subheader as="h3">www.devinit.org</Header.Subheader>
            </Header>
            <Header as="h2">Government revenue, financing and expenditure</Header>
          </Segment>
        </PrintContainer>
        {props.children}
      </Container>
    </Div>
  </Container>);
};

export default Government;
