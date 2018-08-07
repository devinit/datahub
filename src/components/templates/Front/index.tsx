import * as React from 'react';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { Div } from 'glamorous';
import GlobalPictureNavTabs from '../../organisms/NavBarTabs/globalPicture';
import { GlobalPictureSearch } from '../../molecules/SearchInput';
import { red } from '../../theme/semantic';
import { StateToShare } from '../../molecules/ChartShare';
import About from '../../molecules/About';
import DynamicMap from '../../organisms/Map/DynamicMap';
import { cacheMapData } from '../../../utils';
import router from 'next/router';
import Generic from '../Generic';
import pageData from '../../pageData/data';

interface Props {
  state: StateToShare;
}

export default class Front extends React.Component<Props> {
  componentDidMount() {
    cacheMapData('/worker_gp.js');
  }

  render() {
    return (
      <Generic>
        <GlobalPictureSearch />
        <Container>
          <Div paddingTop={ '2em' } paddingBottom={ '2em' } fontSize={ '1.2rem' }>
            <Grid centered>
              <Grid.Column width={ 8 } textAlign="center">
                <b><Icon name="pie graph" />The Development Data Hub{ ' ' }</b>
                { ' ' }
                { pageData.front[0].narrative }.{ ' ' }
                <a href="#about" style={ { color: red } }>{ pageData.front[1].title }</a>
              </Grid.Column>
            </Grid>
          </Div>
        </Container>
        <div style={ { position: 'relative' } }>
          <GlobalPictureNavTabs state={ this.props.state } />
          { this.renderDynamicMap() }
        </div>
        <About router={ router } />
      </Generic>
    );
  }

  private renderDynamicMap() {
    return process.env.NODE_ENV !== 'test' && (process as any).browser
      ? <DynamicMap country="global" state={ this.props.state } />
      : '';
  }
}
