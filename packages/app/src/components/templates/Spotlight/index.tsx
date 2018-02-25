import * as React from 'react';
import { Div } from 'glamorous';
import { Container, Grid, Icon} from 'semantic-ui-react';
import SpotLightNavTabsKe, {SpotlightKeProps} from '../../organisms/NavBarTabs/spotlightKe';
import SpotLightNavTabsUg, {SpotlightUgProps} from '../../organisms/NavBarTabs/spotlightUg';
import About from '@devinit/dh-ui/lib/molecules/About';
import {capitalize} from '@devinit/dh-base/lib/utils';
// import {cacheMapData} from '../../../utils';
import {StateToShare} from '@devinit/dh-ui/lib/molecules/ChartShare';
import DynamicMap from '../../organisms/Map/DynamicMap';
import Generic from '../Generic';

interface Props  {
  pathname: string;
  id: string;
  state: StateToShare;
}

export default class Spotlight extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  public componentDidMount() {
     // TODO: use greenlet to run worker
    console.log('run worker');
    // cacheMapData(`/worker_${this.props.id}.js`);
  }
  public render() {
    const countryName = capitalize(this.props.id);
    const region = this.props.id === 'uganda' ? 'district' : 'country';
    // this casting is hack, typecript couldnt infar correct types
    const navState = {state: this.props.state} as SpotlightKeProps | SpotlightUgProps;
    return (
      <Generic pathname={this.props.pathname} >
        <Container>
          <Div paddingTop={'4em'} paddingBottom={'4em'}>
            <Grid centered>
              <Grid.Column width={12} textAlign="center">
                <b>
                  <Icon name="pie graph" /> Spotlight on {countryName} {' '}
                </b>
                is a comprehensive source of {countryName}'s financial resource flow data at the
                sub-national ({region}) level, alongside indicators on poverty, population, education,
                health, water, hygiene and sanitation. It highlights the geographical variance in
                sector performance and financial resources, and seeks to answer whether resources are
                allocated according to need. Explore the country picture by selecting topics and click
                on a {region} for an in-depth profile.
              </Grid.Column>
            </Grid>
          </Div>
        </Container>
        {this.props.id === 'uganda' ?
          <SpotLightNavTabsUg {...navState} />
          :
          <SpotLightNavTabsKe {...navState} />
        }

        {
          process.env.NODE_ENV !== 'test' ?
            <DynamicMap country={this.props.id} state={this.props.state} /> : ''
        }
        <About />
      </Generic>
    );
  }
}
