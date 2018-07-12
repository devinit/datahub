import { capitalize } from '@devinit/prelude/lib/strings';
import { Div, H4, Img } from 'glamorous';
import router from 'next/router';
import * as React from 'react';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { cacheMapData, getCountry } from '../../../utils';
import About from '../../molecules/About';
import { StateToShare } from '../../molecules/ChartShare';
import DynamicMap from '../../organisms/Map/DynamicMap';
import SpotLightNavTabsKe, { SpotlightKeProps } from '../../organisms/NavBarTabs/spotlightKe';
import SpotLightNavTabsUg, { SpotlightUgProps } from '../../organisms/NavBarTabs/spotlightUg';
import { getSpotlightPageData } from '../../pageData';
import { Country } from '../../types';
import Generic from '../Generic';
import Link from 'next/link';
interface Props {
  pathname: string;
  id: string;
  state: StateToShare;
}

export default class Spotlight extends React.Component<Props> {
  country?: Country = getCountry(this.props.id);

  componentDidMount() {
    cacheMapData(`/worker_${this.props.id}.js`);
  }

  render() {
    const countryName = capitalize(this.props.id);
    // this casting is hack, typecript couldnt infar correct types
    const navState = { state: this.props.state } as SpotlightKeProps | SpotlightUgProps;

    return (
      <Generic >
        <Container>
          <H4 paddingTop="2em" position="absolute" right="150px">
            { this.renderCountryFlag() }
            <Link href={ `/country/${this.props.id}` }>
              <a role="link">{ `${countryName} Country Profile` }</a>
            </Link>
          </H4>
          <Div paddingTop={ '4em' } paddingBottom={ '4em' }>
            <Grid centered>
              <Grid.Column width={ 12 } textAlign="center">
                <b>
                  <Icon name="pie graph" /> Spotlight on { countryName } { ' ' }
                </b>
                { getSpotlightPageData(this.props.id) }
              </Grid.Column>
            </Grid>
          </Div>
        </Container>
        { this.props.id === 'uganda' ?
          <SpotLightNavTabsUg { ...navState } />
          :
          <SpotLightNavTabsKe { ...navState } />
        }

        {
          process.env.NODE_ENV !== 'test' && (process as any).browser ?
            <DynamicMap country={ this.props.id } state={ this.props.state } /> : ''
        }
        <About router={ router } />
      </Generic>
    );
  }

  private renderCountryFlag(): React.ReactElement<any> | null {
    if (this.country) {
      return (
        <Img
          width="16px"
          verticalAlign="middle"
          src={ `/flags/svg/${this.country.id}.svg` }
          marginRight="5px"
          marginBottom="3px"
        />
      );
    }

    return null;
  }
}
