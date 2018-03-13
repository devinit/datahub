import * as React from 'react';
import glamorous, { Div } from 'glamorous';
import { Container, SemanticTEXTALIGNMENTS } from 'semantic-ui-react';
import { VisualizationTour } from '../Maps';
import TourContainer from '../TourContainer';
import {NavBarItem} from '../../types';
import LoadingBar from '../LoadingBar';
import { lightBlack, white, lighterGrey } from '../../theme/semantic';
import NavTabsItems, {Option} from './NavTabsItems';

export type ChangeActiveIndicator<T> = (activeMapIndicator: string) => T;
export type ChangeLoadingStatus<L> = (loading: boolean) => L;

export interface Props<T, L>  {
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
export interface State  {
  selected: number;
  info: string;
  loading: boolean;
  activeIndicator: string;
  tourVisibility: boolean;
}
const TabsContainer = glamorous.ul({
  'listStyleType': 'none',
  'margin': 0,
  'padding': 0,
  'listStyle': 'none',
  'textAlign': 'center',
  'color': lightBlack,
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

class Tabs<T, L> extends React.Component<Props<T, L>, State> {
  public static selectedNavBarThemeIndex(activeIndicator: string, navBarItems: NavBarItem[]): number {
    let themeIndex = 0;
    navBarItems.forEach((current: NavBarItem, index: number) => {
      if (!current.indicators) throw new Error('indicators missing in nav bar props');
      const indicator = current.indicators.find(obj => obj.id === activeIndicator);
      if (indicator) themeIndex = index;
    });
    return themeIndex;
  }
  public navBarItems: NavBarItem[];
  constructor(props: Props<T, L>) {
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
  public componentWillReceiveProps(nextProps: Props<T, L>) {
    if (nextProps !== this.props) {
      this.setState({loading: nextProps.loading});
    }
  }

  public fireReduxActions = (activeIndicator: string) => {
    // these weird ifs are for flow to be happy
    if (!this.props.changeActiveIndicator) throw new Error('missing redux action creator changeActiveIndicator');
    this.props.changeActiveIndicator(activeIndicator);
    if (!this.props.changeLoadingStatus) throw new Error('missing redux action creator changeLoadingStatus');
    this.props.changeLoadingStatus(true);
  }
  public handleClick = (index: number) => (event: React.FormEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!this.navBarItems[index].default_indicator) { throw new Error('default indicator missing in nav items'); }
    const activeIndicator: string | undefined = this.navBarItems[index].default_indicator;
    if (activeIndicator) {
      this.fireReduxActions(activeIndicator);
      this.setState({ selected: index, activeIndicator, loading: true });
    } else {
      // TODO: email error about lack of default indicator
      console.error('missing default indicator');
    }
  }
  public handleSelect = (event: any, data: Option[]) => {
    event.preventDefault();
    const optionElement = event.target.childNodes;
    const text = optionElement[0].textContent;
    const item = data.find(obj => obj.text === text);
    if (!item) throw new Error(`${text} missing in ${JSON.stringify(data)}`);
    const activeIndicator = item.value;
    this.fireReduxActions(activeIndicator);
    this.setState({ activeIndicator, loading: true });
  }
  public handleUsingThisViz = () => {
    if (!this.state.tourVisibility) return this.setState({ tourVisibility: true });
    window.scrollTo(300, 0);
    return this.setState({ tourVisibility: false });
  }
  public toolTipinfo = () => {
    let active = { heading: 'N/A', source: 'N/A' };
    this.navBarItems.forEach((navItem: NavBarItem) => {
      if (navItem.indicators) {
        const item = navItem.indicators.find(obj => obj.id === this.state.activeIndicator);
        if (item && item.tooltip) active = {source: item.source || 'N/A', heading: item.tooltip};
      }
    });
    return active;
  }
  public _renderContent() {
    const selectedNavItem = this.navBarItems[this.state.selected];
    if (!selectedNavItem.indicators) throw new Error('indicators missing in nav bar props');
    const options = selectedNavItem.indicators.map(obj => {
      if (!obj.id || !obj.name) throw new Error('id and name missing in nav bar indicators');
      return { key: obj.id, value: obj.id, text: obj.name };
    });
    return (
      <NavTabsItems
        options={options}
        activeIndicator={this.state.activeIndicator}
        // tslint:disable-next-line:jsx-no-lambda
        onChange={(event, data) => this.handleSelect(event, data)}
        showUsingThisViz={this.props.showUsingThisViz}
        // tslint:disable-next-line:jsx-no-lambda
        onUsingThisVizHandler={() => this.handleUsingThisViz()}
        toolTip={this.toolTipinfo()}
      />
    );
  }
  public _renderTitles() {
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
                onClick={this.handleClick(index)}
              >
                {navItem.name}
              </TabLink>
            </li>
          );
        })}
      </TabsContainer>
    );
  }

  public render() {
    let entity = 'country';
    if (this.props.isForSpotlightsKe) entity = 'county';
    if (this.props.isForSpotlightsUg) entity = 'district';
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
          bottom={this.props.isForSpotlightsUg || this.props.isForSpotlightsKe ? '-22%' : '0px'}
          top={this.props.isForSpotlightsUg || this.props.isForSpotlightsKe ? '25%' : '-50px'}
          visible={this.state.tourVisibility}
          // tslint:disable-next-line:jsx-no-lambda
          closeHandler={() => this.handleUsingThisViz()}
        >
          <VisualizationTour entity={entity} />
        </TourContainer>
      </section>
    );
  }
}

export default Tabs;
