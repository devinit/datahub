// @flow
import {Container, Grid, Header} from 'semantic-ui-react';
import React from 'react';
import Chart from 'components/atoms/Chart';
import {P} from 'glamorous';
import {big} from 'components/theme';
import {red} from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';

type Props = {
 ...TabDataQuery,
 config: any
}
// TODO: move to separate file
const getResourcesOverTime = (data: any[]) =>
  [data].map(list => {
    const years = list
      .reduce((all, d) => {
        if (all[d.year]) {
          return {...all, [d.year]: [d, ...all[d.year]]};
        }

        return {[d.year]: [d], ...all};
      }, {});

    const types: any = Object.keys(years)
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

const International = (props: Props) => {
  if (!props.internationalResources) throw new Error('No international resources data');
  const internationalResources = props.internationalResources;
  const resourcesOverTime = internationalResources.resourcesOverTime &&
    internationalResources.resourcesOverTime.data ?
    getResourcesOverTime(internationalResources.resourcesOverTime.data) : null;
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
          {
                internationalResources.netODAOfGNIIn &&
                internationalResources.netODAOfGNIIn.toolTip ?
                  <TabsToolTip {...internationalResources.netODAOfGNIIn.toolTip} /> : ''
              }
          <P fontSize={big} fontWeight={'bold'} color={red}>{internationalResources.netODAOfGNIIn} of GNI</P>
          <P>Gross national income is {internationalResources.GNI}</P>
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            HOW HAVE RESOURCE INFLOWS CHANGED OVER TIME?
          </Header>
          {
                internationalResources.resourcesOverTime &&
                internationalResources.resourcesOverTime.toolTip ?
                  <TabsToolTip {...internationalResources.resourcesOverTime.toolTip} /> : ''
              }
          { resourcesOverTime && resourcesOverTime.data ?
            <Chart
              config={props.config.resourcesOverTime}
              data={resourcesOverTime}
              height="140px"
            /> : <P fontSize={big} fontWeight={'bold'} color={red}>No data</P>
          }
        </Grid.Column>

        <Grid.Column computer={5} tablet={16} mobile={16}>
          <Header
            textAlign="center"
            as="h3"
          >
            WHAT’S THE MIX OF RESOURCES?
          </Header>
          {
                internationalResources.mixOfResources &&
                internationalResources.mixOfResources.toolTip ?
                  <TabsToolTip {...internationalResources.mixOfResources.toolTip} /> : ''
              }
          {
            internationalResources.mixOfResources &&
              internationalResources.mixOfResources.data ?
                <Chart
                  config={props.config.mixOfResources}
                  data={internationalResources.mixOfResources.data}
                  height="140px"
                /> : <P fontSize={big} fontWeight={'bold'} color={red}>No data</P>
          }

        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default International;
