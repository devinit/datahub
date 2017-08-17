// @flow
import React, {Component} from 'react';
import glamorous from 'glamorous';
import { medium } from 'components/theme';
import { lightGrey } from 'components/theme/semantic';
import { Container } from 'semantic-ui-react';

type Props = {
  children: any,
  selected?: number,
  textAlign?: string
};
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
  },
});
const TabLink = glamorous.a({
  padding: '.75em .35em',
  marginRight: '30px',
  cursor: 'pointer',
  color: lightGrey,
  display: 'inline-block',
});
const TabsContentWrapper = glamorous.div(
  {
    position: 'relative',
    background: '#e9e7e8',
    fontWeight: 'bold',
    '& .tabs__content': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      opacity: 0,
      visibility: 'hidden',
      height: 0,
      transform: 'translate(0,100%)',
      transition: 'opacity, transform .3s cubic-bezier(.215,.61,.355,1)',
      transitionTimingFunction: 'cubic-bezier(.215,.61,.355,1)',
    },
    '& .ui.header>.icon': {
      fontSize: medium,
    },
    '& .visible': {
      position: 'relative',
      visibility: 'visible',
      height: 'auto',
      opacity: 1,
      paddingTop: '3em',
      paddingBottom: '3em',
      lineHeight: '1em',
      transform: 'none',
    },
  }
);
class Tabs extends Component {
  static defaultProps = {
    selected: 0,
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }
  state: {
    selected?: number,
  };
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selected !== this.props.selected) {
      this.setState({selected: nextProps.selected});
    }
  }
  handleClick(index: number, event: any) {
    event.preventDefault();
    this.setState({
      selected: index,
    });
  }
  _renderContent() {
    const content = this.props.children
      .filter(child => child && child.props.label && child.props.id)
      .map((child, index) => {
        const activeClass = this.state.selected === index ? 'visible' : '';
        return (
          <div className={`tabs__content ${activeClass}`} key={`__${child.props.id}__`}>
            {child}
          </div>
        );
      });
    return content;
  }
  _renderTitles() {
    const createTitleElms = (child, index) => {
      const activeClass = this.state.selected === index ? 'active' : '';
      return (
        <li key={child.props.label}>
          <TabLink className={activeClass} onClick={e => this.handleClick(index, e)}>
            {child.props.label}
          </TabLink>
        </li>
      );
    };
    return (
      <TabsContainer>
        {this.props.children
          .filter(child => child && child.props.label && child.props.id)
          .map(createTitleElms)}
      </TabsContainer>
    );
  }

  render() {
    return (
      <Wrapper>
        <Container textAlign={this.props.textAlign || 'left'}>
          {this._renderTitles()}
        </Container>
        <TabsContentWrapper>
          {this._renderContent()}
        </TabsContentWrapper>
      </Wrapper>
    );
  }
}
export default Tabs;
