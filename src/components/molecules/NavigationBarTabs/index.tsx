import { Div } from 'glamorous';
import * as introJS from 'intro.js';
import * as React from 'react';
import { Container, SemanticTEXTALIGNMENTS } from 'semantic-ui-react';
import { updateAnalytics } from '../../../utils/analytics';
import { lighterGrey } from '../../theme/semantic';
import { NavBarItem } from '../../types';
import LoadingBar from '../LoadingBar';
import { VisualizationTour } from '../Maps';
import TourContainer from '../TourContainer';
import NavTabsItems, { Option } from './NavTabsItems';
import { TabLink } from './TabLink';
import { TabsContainer } from './TabsContainer';
import { Intro } from '../../atoms/Intro';

export type ChangeActiveIndicator<T> = (activeMapIndicator: string) => T;
export type ChangeLoadingStatus<L> = (loading: boolean) => L;

export interface Props<T, L> {
  navBarItems: NavBarItem[]; // defined in global types
  activeIndicator: string;
  changeActiveIndicator?: ChangeActiveIndicator<T>; // made optional to make flow happy!!!
  changeLoadingStatus?: ChangeLoadingStatus<L>;
  showUsingThisViz?: boolean;
  loading: boolean;
  isForSpotlightsKe?: boolean;
  isForSpotlightsUg?: boolean;
  selected?: number;
  textAlign?: SemanticTEXTALIGNMENTS;
}
export interface State {
  selected: number;
  info: string;
  loading: boolean;
  activeIndicator: string;
  tourVisibility: boolean;
}

class Tabs<T, L> extends React.Component<Props<T, L>, State> {
  constructor(props: Props<T, L>) {
    super(props);

    if (!props.navBarItems) {
      throw new Error('nav bar data missing');
    }
    this.state = {
      selected: Tabs.selectedNavBarThemeIndex(props.activeIndicator, props.navBarItems),
      loading: true,
      tourVisibility: false,
      activeIndicator: props.activeIndicator,
      info: ''
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUsingThisViz = this.handleUsingThisViz.bind(this);
  }

  render() {
    let entity = 'country';
    if (this.props.isForSpotlightsKe) { entity = 'county'; }
    if (this.props.isForSpotlightsUg) { entity = 'district'; }

    return (
      <section>
        <LoadingBar loading={ this.state.loading } />
        <div>
          <Div background={ lighterGrey }>
            <Container textAlign={ this.props.textAlign || 'left' }>
            <Intro step={ 1 } intro="Change theme">
              <TabsContainer>
                { this.renderTitles() }
              </TabsContainer>
            </Intro>
            </Container>
          </Div>
          { this.renderContent() }
        </div>
        <TourContainer
          bottom={ this.props.isForSpotlightsUg || this.props.isForSpotlightsKe ? '-22%' : '0px' }
          top={ this.props.isForSpotlightsUg || this.props.isForSpotlightsKe ? '25%' : '-50px' }
          visible={ this.state.tourVisibility }
        >
          <VisualizationTour entity={ entity } />
        </TourContainer>
      </section>
    );
  }

  componentWillReceiveProps(nextProps: Props<T, L>) {
    if (nextProps !== this.props) {
      this.setState({
        loading: nextProps.loading,
        selected: Tabs.selectedNavBarThemeIndex(nextProps.activeIndicator, nextProps.navBarItems),
        activeIndicator: nextProps.activeIndicator
      });
    }
  }

  private renderContent() {
    const selectedNavItem = this.props.navBarItems[this.state.selected];
    if (!selectedNavItem.indicators) {
      throw new Error('indicators missing in nav bar props');
    }
    const options = selectedNavItem.indicators.map(indicator => {
      if (!indicator.id || !indicator.name) {
        throw new Error('id and name missing in nav bar indicators');
      }

      return { key: indicator.id, value: indicator.id, text: indicator.name };
    });

    return (
      <NavTabsItems
        options={ options }
        activeIndicator={ this.state.activeIndicator }
        onChange={ this.handleSelect }
        showUsingThisViz={ this.props.showUsingThisViz }
        onUsingThisVizHandler={ this.handleUsingThisViz }
        toolTip={ this.toolTipinfo() }
      />
    );
  }

  private renderTitles() {
    return this.props.navBarItems.map((navItem: NavBarItem, index: number) => {
      const activeClass = this.state.selected === index ? 'active' : '';
      if (!navItem.id || !navItem.name) {
        throw new Error('navbar id and name missing');
      }
      // FIXME: handle this better i.e more abstraction, perhaps all done via props
      const href = !this.props.isForSpotlightsKe && !this.props.isForSpotlightsUg
        ? `/global-picture/${navItem.id}`
        : `/${navItem.id}`;

      return (
        <li key={ navItem.id }>
          <TabLink
            className={ activeClass }
            href={ href }
            onClick={ this.handleClick(index) }
          >
            { navItem.name }
          </TabLink>
        </li>
      );
    });
  }

  fireReduxActions = (activeIndicator: string) => {
    // these weird ifs are for flow to be happy
    if (!this.props.changeActiveIndicator) {
      throw new Error('missing redux action creator changeActiveIndicator');
    }
    this.props.changeActiveIndicator(activeIndicator);
    if (!this.props.changeLoadingStatus) {
      throw new Error('missing redux action creator changeLoadingStatus');
    }
    this.props.changeLoadingStatus(true);
  }

  handleClick = (index: number) => (event: React.FormEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!this.props.isForSpotlightsKe && !this.props.isForSpotlightsUg) {
      const activeItem = this.props.navBarItems[index];
      const path = `/global-picture/${activeItem.id}`;
      window.history.replaceState({ path }, activeItem.id, path);
      updateAnalytics(path.split('/')[2], path);
    }
    if (!this.props.navBarItems[index].default_indicator) {
      throw new Error('default indicator missing in nav items');
    }
    const activeIndicator: string | undefined = this.props.navBarItems[index].default_indicator;
    if (activeIndicator) {
      this.fireReduxActions(activeIndicator);
      this.setState({ selected: index, activeIndicator, loading: true });
    } else {
      // TODO: email error about lack of default indicator
      console.error('missing default indicator');
    }
  }

  handleSelect = (event: any, data: Option[]) => {
    event.preventDefault();
    const optionElement = event.target.childNodes;
    const text = optionElement[0].textContent;
    const item = data.find(obj => obj.text === text);
    if (!item) { throw new Error(`${text} missing in ${JSON.stringify(data)}`); }
    const activeIndicator = item.value;
    this.fireReduxActions(activeIndicator);
    this.setState({ activeIndicator, loading: true });
  }

  handleUsingThisViz = () => {
    // if (!this.state.tourVisibility) { return this.setState({ tourVisibility: true }); }
    // window.scrollTo(300, 0);

    // return this.setState({ tourVisibility: false });
    introJS().setOptions({ showStepNumbers: false }).start();
  }

  toolTipinfo = () => {
    let active = { heading: 'N/A', source: 'N/A' };
    this.props.navBarItems.forEach((navItem: NavBarItem) => {
      if (navItem.indicators) {
        const item = navItem.indicators.find(obj => obj.id === this.state.activeIndicator);
        if (item && item.tooltip) { active = { source: item.source || 'N/A', heading: item.tooltip }; }
      }
    });

    return active;
  }

  public static selectedNavBarThemeIndex(activeIndicator: string, navBarItems: NavBarItem[]): number {
    let themeIndex = 0;
    navBarItems.forEach((current: NavBarItem, index: number) => {
      if (!current.indicators) {
        throw new Error('indicators missing in nav bar props');
      }
      const indicator = current.indicators.find(obj => obj.id === activeIndicator);
      if (indicator) {
        themeIndex = index;
      }
    });

    return themeIndex;
  }
}

export default Tabs;
