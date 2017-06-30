// @flow
import React from 'react';
import glamorous from 'glamorous';
import type { Element } from 'react';
import { Container } from 'semantic-ui-react';
import { lightBlack, white, lightGrey } from 'components/theme/semantic';

type Props = {
  children: any,
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
const TabLinkWrapper = glamorous.div({
  background: lightGrey,
});

class Tabs extends React.Component {

  static defaultProps = {
    selected: 0,
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: props.selected
    };
  }
  state: {
    selected?: number
  }
  handleClick(index: number, event: any) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  }
  _renderContent() {
    return (
      <div className="tabs__content">
        {this.props.children[this.state.selected]}
      </div>
    );
  }
  _renderTitles() {
    const labels = (child, index) => {
      const activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
          <TabLink
            className={activeClass}
            onClick={(e) => this.handleClick(index, e)}
          >
            {child.props.label}
          </TabLink>
        </li>
      );
    };
    return (
      <TabsContainer>
        {this.props.children.map(labels)}
      </TabsContainer>
    );
  }

  render() {
    return (
      <div className="tabs">
        <TabLinkWrapper>
          <Container textAlign={this.props.textAlign || 'left'}>
            {this._renderTitles()}
          </Container>
        </TabLinkWrapper>
        {this._renderContent()}
      </div>
    );
  }
}

export default Tabs;
