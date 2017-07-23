// @flow
import React from 'react';
import glamorous, {Div} from 'glamorous';
import type { Element } from 'react';
import { Container } from 'semantic-ui-react';
import NavigationBarTabsContainer from 'components/atoms/NavigationBarTabsContainer';
import { lightBlack, white, lighterGrey } from 'components/theme/semantic';

type Indicator = {|
  id: string,
  name: string,
|}

type NavItem = {|
    id: string,
    name: string,
    indicators: Indicator[],
    default_indicator: string,
|}

export type ChangeActiveIndicator<T> =
  ((activeMapIndicator: string) => Dispatch<T>);

type Props<T> = {
  navBarItems: NavItem[],
  changeActiveIndicator?: ChangeActiveIndicator<T>,
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

class Tabs extends React.Component {
  static defaultProps = {
    selected: 0,
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: 0, // select first item by default
      activeIndicator: this.props.navBarItems[0].default_indicator
    };
  }
  state: {
    selected: number,
    activeIndicator: string
  }
  handleClick(index: number, event: any) {
    event.preventDefault();
    this.setState({
      selected: index,
      activeIndicator: this.props.navBarItems[index].default_indicator
    });
  }
  handleSelect(event: any) {
    event.preventDefault();
    this.setState({activeIndicator: event.value});
  }
  _renderContent() {
    const selectedNavItem = this.props.navBarItems[this.state.selected || 0];
    const options = selectedNavItem.indicators.map(obj => ({key: obj.id, value: obj.name}));
    return (
      <NavigationBarTabsContainer options={options} onChange={this.handleSelect} />
    );
  }
  _renderTitles() {
    const addNavBarLabels = (navItem: NavItem, index: number) => {
      const activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
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
        {this.props.navBarItems.map(addNavBarLabels)}
      </TabsContainer>
    );
  }

  render() {
    return (
      <div>
        <Div background={lighterGrey}>
          <Container textAlign={this.props.textAlign || 'left'}>
            {this._renderTitles()}
          </Container>
        </Div>
        {this._renderContent()}
      </div>
    );
  }
}

export default Tabs;
