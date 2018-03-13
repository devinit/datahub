import * as React from 'react';
import { Div } from 'glamorous';
import { Container, Grid, Icon} from 'semantic-ui-react';
import SpotLightNavTabsKe, {SpotlightKeProps} from '../../organisms/NavBarTabs/spotlightKe';
import SpotLightNavTabsUg, {SpotlightUgProps} from '../../organisms/NavBarTabs/spotlightUg';
import About from '../../molecules/About';
import {capitalize} from '@devinit/prelude';
import {cacheMapData} from '../../../utils';
import {StateToShare} from '../../molecules/ChartShare';
import DynamicMap from '../../organisms/Map/DynamicMap';
import Generic from '../Generic';
import {getSpotlightPageData} from '../../pageData';

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
    cacheMapData(`/worker_${this.props.id}.js`);
  }
  public render() {
    const countryName = capitalize(this.props.id);
    // this casting is hack, typecript couldnt infar correct types
    const navState = {state: this.props.state} as SpotlightKeProps | SpotlightUgProps;
    return (
      <Generic >
        <Container>
          <Div paddingTop={'4em'} paddingBottom={'4em'}>
            <Grid centered>
              <Grid.Column width={12} textAlign="center">
                <b>
                  <Icon name="pie graph" /> Spotlight on {countryName} {' '}
                </b>
                {getSpotlightPageData(this.props.id)}
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
          process.env.NODE_ENV !== 'test' && (process as any).browser ?
            <DynamicMap country={this.props.id} state={this.props.state} /> : ''
        }
        <About />
      </Generic>
    );
  }
}
