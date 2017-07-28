// @flow
import {Button, Container, Grid, Header, Icon} from 'semantic-ui-react';
import React from 'react';
import Chart from 'components/atoms/Chart';
import {HeaderGroup} from 'components/atoms/Header';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';

const International = (props: TabDataQuery) => {
  if (!props.internationalResources) return new Error('No international resources data');

  const resourcesOverTime = [props.internationalResources.resourcesOverTime]
    .map(list => {
      const years = list
        .reduce((all, d) => {
          if (all[d.year]) {
            return {...all, [d.year]: [d, ...all[d.year]]};
          }

          return {[d.year]: [d], ...all};
        }, {});

      const types = Object.keys(years)
        .map(y => {
          const types = years[y]
            .reduce((all, d) => {
              if (all[d.flow_type]) {
                return {...all, [d.flow_type]: [d, ...all[d.flow_type]]};
              }

              return {[d.flow_type]: [d], ...all};
            }, {});

          return Object.keys(types)
            .map(t => types[t].reduce((s, d) => ({...s, value: s.value + d.value})));
        });

      return Object.keys(types).map(t => types[t]).reduce((all, d) => [...all, ...d], []);
    })
    .reduce((_, d) => d);

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

          <Chart
            config={props.config.resourcesOverTime}
            data={resourcesOverTime}
            height="140px"
          />
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT’S THE MIX OF RESOURCES?
          </Header>


          <Chart
            config={props.config.mixOfResources}
            data={props.internationalResources.mixOfResources}
            height="140px"
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default International;
