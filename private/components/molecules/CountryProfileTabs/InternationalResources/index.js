// @flow
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import React from 'react';
import {HeaderGroup} from 'components/atoms/Header';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';

const International = (props: TabDataQuery) => {
  if (!props.internationalResources) return new Error('No international resources data');
  return (
    <Container>
      <Grid textAlign={'center'}>
        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            AS A SHARE OF GNI, HOW MUCH AID IS ALLOCATED TO UGANDA?
          </Header>
          <P fontSize={big} fontWeight={'bold'} color={red}>{props.internationalResources.netODAOfGNIIn } of GNI</P>
          <P>Gross national income is {props.internationalResources.GNI}</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW HAVE RESOURCE INFLOWS CHANGED OVER TIME?
          </Header>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT’S THE MIX OF RESOURCES?
          </Header>

        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default International;
