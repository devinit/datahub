// @flow
import React from 'react';
import glamorous from 'glamorous';
import type { Element } from 'react';
import { Container } from 'semantic-ui-react';

type Props = {
  children: any,
    selected?: number
}
const Wrapper = glamorous.div({
  paddingTop: '1rem',
  borderTop: '2px solid #ddd9dc',
});
const TabsContainer = glamorous.ul({
  listStyleType: 'none',
  margin: 0,
  textTransform: 'uppercase',
  padding: 0,
  listStyle: 'none',
  height: '2.5em',
  color: '#b8b1b6',
  '& .active': {
    color: '#453f43',
    borderBottom: '4px solid #e8443a',
    fontWeight: '700',
  },
  '& li': {
    float: 'left',
  }
});
const TabLink = glamorous.a({
  padding: '.75em .35em',
  marginRight: '30px',
  cursor: 'pointer',
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
      <Wrapper>
        <div className="tabs">
          <Container>
            {this._renderTitles()}
          </Container>
          {this._renderContent()}
        </div>
      </Wrapper>
    );
  }
}

export default Tabs;
