// @flow
import React from 'react';
import glamorous from 'glamorous';
import { Container } from 'semantic-ui-react';

type Props = {
  children: any,
  selected?: number,
  textAlign?: string,
  height?: string
}
const Wrapper = glamorous.div({
  borderTop: '2px solid #ddd9dc',
  paddingTop: '0.25em',
});
const TabsContainer = glamorous.ul({
  listStyleType: 'none',
  margin: 0,
  textTransform: 'uppercase',
  padding: 0,
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
  display: 'inline-block',
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
    lineHeight: '1em',
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
    const content = this.props.children
      .filter(child => child && child.props.label && child.props.id)
      .map((child, index) => {
        const activeClass = (this.state.selected === index ? 'visible' : '');
        return (
          <div className={`tabs__content ${activeClass}`} key={`__${child.props.id}__`} >
            {child}
          </div>
        );
      });
    return content;
  }
  _renderTitles() {
    const labels = (child, index) => {
      const activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={child.props.label}>
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
        {this.props.children
          .filter(child => child && child.props.label && child.props.id)
          .map(labels)}
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
export default Tabs;
