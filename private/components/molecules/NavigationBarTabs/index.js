// @flow
import React from 'react';
import glamorous, { Div } from 'glamorous';
import { Container } from 'semantic-ui-react';
import GlobalVisualizationTour from 'components/atoms/GlobalVisualizationTour';
import TourContainer from 'components/molecules/TourContainer';
import type { LoadingStatus } from 'lib/actions';
import LoadingBar from 'components/molecules/LoadingBar';
import { lightBlack, white, lighterGrey } from 'components/theme/semantic';
import NavigationBarTabsContainer from 'components/molecules/NavigationBarTabsItems';
import type {Option} from 'components/molecules/NavigationBarTabsItems';

export type ChangeActiveIndicator<T> = (activeMapIndicator: string) => Dispatch<T>;
export type ChangeLoadingStatus = (loading: boolean) => Dispatch<LoadingStatus>

export type Props<T> = {
  navBarItems: NavBarItem[], // defined in global types
  activeIndicator: string,
  changeActiveIndicator?: ChangeActiveIndicator<T>, // made optional to make flow happy!!!
  changeLoadingStatus?: ChangeLoadingStatus,
  showUsingThisViz?: boolean,
  loading: boolean,
  selected?: number,
  textAlign?: string,
};
type State = {
  selected: number,
  info: string,
  loading: boolean,
  activeIndicator: string,
  tourVisibility: boolean,
};
const TabsContainer = glamorous.ul({
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  textAlign: 'center',
  color: lightBlack,
  '& .active': {
    color: white,
    backgroundColor: lightBlack,
  },
  '& li': {
    display: 'inline-flex',
  },
});
const TabLink = glamorous.a({
  padding: '.75em .85em',
  marginRight: '0',
  cursor: 'pointer',
});

class Tabs<T> extends React.Component {
  static selectedNavBarThemeIndex(activeIndicator: string, navBarItems: NavBarItem[]): number {
    let themeIndex = 0;
    navBarItems.forEach((current: NavBarItem, index: number) => {
      if (!current.indicators) throw new Error('indicators missing in nav bar props');
      const indicator = current.indicators.find(obj => obj.id === activeIndicator);
      if (indicator) themeIndex = index;
    });
    return themeIndex;
  }
  constructor(props: Props<T>) {
    super(props);
    if (!props.navBarItems) throw new Error('nav bar data missing');
    const selected = Tabs.selectedNavBarThemeIndex(props.activeIndicator, props.navBarItems);
    this.state = {
      selected,
      loading: true,
      tourVisibility: false,
      activeIndicator: props.activeIndicator,
      info: '',
    };
    this.navBarItems = props.navBarItems;
  }
  state: State
  componentWillReceiveProps(nextProps: Props<T>) {
    if (nextProps !== this.props) {
      this.setState({loading: nextProps.loading});
    }
  }
  navBarItems: NavBarItem[];

  fireReduxActions(activeIndicator: string) {
    // these weird ifs are for flow to be happy
    if (!this.props.changeActiveIndicator) throw new Error('missing redux action creator changeActiveIndicator');
    this.props.changeActiveIndicator(activeIndicator);
    if (!this.props.changeLoadingStatus) throw new Error('missing redux action creator changeLoadingStatus');
    this.props.changeLoadingStatus(true);
  }
  handleClick(index: number, event: any) {
    event.preventDefault();
    if (!this.navBarItems[index].default_indicator) { throw new Error('default indicator missing in nav items'); }
    const activeIndicator: string = this.navBarItems[index].default_indicator;
    this.fireReduxActions(activeIndicator);
    this.setState({ selected: index, activeIndicator, loading: true });
  }
  handleSelect(event: any, data: Option[]) {
    event.preventDefault();
    const optionElement = event.target.childNodes;
    const text = optionElement[0].textContent;
    const item = data.find(obj => obj.text === text);
    if (!item) throw new Error(`${text} missing in ${JSON.stringify(data)}`);
    const activeIndicator = item.value;
    this.fireReduxActions(activeIndicator);
    this.setState({ activeIndicator, loading: true });
  }
  handleUsingThisViz() {
    if (!this.state.tourVisibility) return this.setState({ tourVisibility: true });
    window.scrollTo(300, 0);
    return this.setState({ tourVisibility: false });
  }
  toolTipinfo() {
    let active = { heading: 'N/A', source: 'N/A' };
    this.navBarItems.forEach((navItem: NavBarItem) => {
      if (navItem.indicators) {
        const item = navItem.indicators.find(obj => obj.id === this.state.activeIndicator);
        if (item && item.tooltip) active = {...item, heading: item.tooltip};
      }
    });
    return active;
  }
  _renderContent() {
    const selectedNavItem = this.navBarItems[this.state.selected];
    if (!selectedNavItem.indicators) throw new Error('indicators missing in nav bar props');
    const options = selectedNavItem.indicators.map(obj => {
      if (!obj.id || !obj.name) throw new Error('id and name missing in nav bar indicators');
      return { key: obj.id, value: obj.id, text: obj.name };
    });
    return (
      <NavigationBarTabsContainer
        options={options}
        activeIndicator={this.state.activeIndicator}
        onChange={(e, options) => this.handleSelect(e, options)}
        showUsingThisViz={this.props.showUsingThisViz}
        onUsingThisVizHandler={() => this.handleUsingThisViz()}
        toolTip={this.toolTipinfo()}
      />
    );
  }
  _renderTitles() {
    return (
      <TabsContainer>
        {this.navBarItems.map((navItem: NavBarItem, index: number) => {
          const activeClass = this.state.selected === index ? 'active' : '';
          if (!navItem.id || !navItem.name) throw new Error('navbar id and name missing');
          return (
            <li key={navItem.id}>
              <TabLink
                className={activeClass}
                href={`/${navItem.id}`}
                onClick={e => this.handleClick(index, e)}
              >
                {navItem.name}
              </TabLink>
            </li>
          );
        })}
      </TabsContainer>
    );
  }

  render() {
    return (
      <section>
        <LoadingBar loading={this.state.loading} />
        <div>
          <Div background={lighterGrey}>
            <Container textAlign={this.props.textAlign || 'left'}>
              {this._renderTitles()}
            </Container>
          </Div>
          {this._renderContent()}
        </div>
        <TourContainer
          visible={this.state.tourVisibility}
          closeHandler={() => this.handleUsingThisViz()}
        >
          <GlobalVisualizationTour />
        </TourContainer>
      </section>
    );
  }
}

export default Tabs;
