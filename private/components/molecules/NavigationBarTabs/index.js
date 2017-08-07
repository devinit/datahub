// @flow
import React from 'react';
import glamorous, {Div} from 'glamorous';
import { Container } from 'semantic-ui-react';
import NavigationBarTabsContainer from 'components/atoms/NavigationBarTabsContainer';
import GlobalVisualizationTour from 'components/atoms/GlobalVisualizationTour';
import TourContainer from 'components/molecules/TourContainer';
import { lightBlack, white, lighterGrey } from 'components/theme/semantic';

type NavItem = GlobalPictureThemesQuery;

export type ChangeActiveIndicator<T> =
  ((activeMapIndicator: string) => Dispatch<T>);

type Props<T> = {
  navBarItems: NavItem[],
  activeIndicator: string,
  changeActiveIndicator?: ChangeActiveIndicator<T>,
  showUsingThisViz?: boolean,
  selected?: number,
  textAlign?: string
}
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
  }
});
const TabLink = glamorous.a({
  padding: '.75em .85em',
  marginRight: '0',
  cursor: 'pointer',
});

class Tabs<T> extends React.Component {
  constructor(props: Props<T>) {
    super(props);
    if (!props.navBarItems) throw new Error('nav bar data missing');
    this.state = {
      selected: 0,
      tourVisibility: false,
      activeIndicator: props.activeIndicator,
      info: 'hey'
    };
    this.navBarItems = props.navBarItems;
  }
  state: {
    selected: number,
    info: string,
    activeIndicator: string,
    tourVisibility: boolean
  }
  navBarItems: NavItem[];
  handleClick(index: number, event: any) {
    event.preventDefault();
    this.setState({
      selected: index
    });
    if (!this.navBarItems[index].default_indicator) throw new Error('default indicator missing in nav items');
    const activeIndicator: string = this.navBarItems[index].default_indicator;
    this.setState({activeIndicator});
    if (activeIndicator && this.props.changeActiveIndicator) {
      this.props.changeActiveIndicator(activeIndicator);
    }
  }
  handleSelect(event: any) {
    event.preventDefault();
    const activeIndicator = event.target.value;
    this.setState({activeIndicator});
    if (activeIndicator && this.props.changeActiveIndicator) {
      this.props.changeActiveIndicator(activeIndicator);
    }
  }
  handleUsingThisViz() {
    if (!this.state.tourVisibility) return this.setState({tourVisibility: true});
    window.scrollTo(300, 0);
    return this.setState({tourVisibility: false});
  }
  toolTipinfo() {
    let active = {heading: 'N/A', source: 'N/A'};
    this.navBarItems.forEach((navItem: NavItem) => {
      if (navItem.indicators) {
        const item = navItem.indicators.find(obj => obj.id === this.state.activeIndicator);
        if (item) active = item;
      }
    });
    return active;
  }
  _renderContent() {
    const selectedNavItem = this.navBarItems[this.state.selected];
    if (!selectedNavItem.indicators) throw new Error('indicators missing in nav bar props');
    const options = selectedNavItem.indicators.map(obj => {
      if (!obj.id || !obj.name) throw new Error('id and name missing in nav bar indicators');
      return {key: obj.id, value: obj.name};
    });
    return (
      <NavigationBarTabsContainer
        options={options}
        onChange={(e) => this.handleSelect(e)}
        showUsingThisViz={this.props.showUsingThisViz}
        onUsingThisVizHandler={() => this.handleUsingThisViz()}
        toolTip={this.toolTipinfo()}
      />
    );
  }
  _renderTitles() {
    const addNavBarLabels = (navItem: NavItem, index: number) => {
      const activeClass = (this.state.selected === index ? 'active' : '');
      if (!navItem.id || !navItem.name) throw new Error('navbar id and name missing');
      return (
        <li key={navItem.id}>
          <TabLink
            className={activeClass}
            href={`/${navItem.id}`}
            onClick={(e) => this.handleClick(index, e)}
          >
            {navItem.name}
          </TabLink>
        </li>
      );
    };
    return (
      <TabsContainer>
        {this.navBarItems.map(addNavBarLabels)}
      </TabsContainer>
    );
  }

  render() {
    return (
      <section>
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
