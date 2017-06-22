// @flow
import React from 'react';
import glamorous from 'glamorous';
import type { Element } from 'react';
import { Container } from 'semantic-ui-react';
import TabsDark from './TabsDark';
import Pane from './Pane';

type Props = {
  children: any,
  selected?: number,
  textAlign?: string,
  height?: string
}
const Wrapper = glamorous.div({
  paddingTop: '1rem',
});
const TabsContainer = glamorous.ul({
  listStyleType: 'none',
  margin: 0,
  textTransform: 'uppercase',
  padding: 0,
  paddingBottom: '1em',
  listStyle: 'none',
  color: '#b8b1b6',
  '& .active': {
    color: '#453f43',
    borderBottom: '4px solid #e8443a',
    fontWeight: '700',
  },
  '& li': {
    display: 'inline',
  }
});
const TabLink = glamorous.a({
  padding: '.75em .35em',
  marginRight: '30px',
  cursor: 'pointer',
});
const TabsContentWrapper = glamorous.div({
  position: 'relative',
  background: '#e9e7e8',
  '& .tabs__content': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    opacity: 0,
    paddingTop: '4em',
    paddingBottom: '4em',
    visibility: 'hidden',
    transform: 'translate(0,100%)',
    transition: '.3s cubic-bezier(.215,.61,.355,1)',
    transitionTimingFunction: 'cubic-bezier(.215,.61,.355,1)'
  },
  '& .visible': {
    visibility: 'visible',
    opacity: 1,
    transform: 'none',
  }
}, (props) => ({
  height: props.height,
}));
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
    const content = this.props.children.map((child, index) => {
      const activeClass = (this.state.selected === index ? 'visible' : '');
      return (
        <div className={`tabs__content ${activeClass}`}>
          {this.props.children[index]}
        </div>
      );
    });
    return content;
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
        <Container textAlign={this.props.textAlign || 'left'}>
          {this._renderTitles()}
        </Container>
        <TabsContentWrapper height={this.props.height}>
          {this._renderContent()}
        </TabsContentWrapper>
      </Wrapper>
    );
  }
}
export {TabsDark, Pane};
export default Tabs;
