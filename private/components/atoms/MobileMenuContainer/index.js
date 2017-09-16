// @flow
import React from 'react';
import glamorous from 'glamorous';
import Link from 'next/link';
import { white, redHeaderColor, midWhite, lightBlack } from 'components/theme/semantic';

type Props = {
  children: any,
  selected?: number,
  open?: any,
};
export const Navigation = glamorous.nav(
  {
    position: 'fixed',
    top: '4em',
    right: '-14px',
    width: '23em',
    height: '100%',
    borderTop: `10px solid ${redHeaderColor}`,
    paddingBottom: '4em',
    overflow: 'scroll',
    background: white,
    boxShadow: '0 4px 6px rgba(0,0,0,.3)',
    transform: 'translate(100%,0)',
    transition: 'all .3s',
    '& .navigation__item': {
      position: 'relative',
      display: 'block',
      marginBottom: '2px',
      height: '4em',
      overflow: 'hidden',
    },
    '& li.active': {
      height: 'auto',
      overflow: 'vissible',
    },
    '& .navigation__item-title': {
      display: 'block',
      height: '4em',
      padding: '1.5rem 1.8rem 1.8rem 1.8rem',
      fontWeight: '700',
      background: midWhite,
      cursor: 'pointer',
      color: lightBlack,
    },
  },
  props => ({
    transform: props.open ? 'translate(0,0)' : 'translate(100%,0)',
  }),
);

class MobileMenu extends React.Component {
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
    selected?: any,
  };
  resetSelected() {
    this.setState({ selected: null });
  }
  handleClick(index: number, event: any) {
    event.preventDefault();
    this.setState({
      selected: index,
    });
  }
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  _renderContent() {
    const items = (child, index) => {
      const activeClass = this.state.selected === index ? 'active' : '';
      return (
        <li
          key={index}
          className={`navigation__item ${activeClass}`}
          onClick={e => {
            child.props.hasSub ? this.handleClick(index, e) : '';
            this.state.selected === index ? this.resetSelected() : '';
          }}
        >
          <span className="navigation__item-title small">
            <Link href={child.props.url} prefetch>
              <a role="link">
                {child.props.label}
              </a>
            </Link>
          </span>
          {child}
        </li>
      );
    };
    return this.props.children.map(items);
  }
  render() {
    return (
      <Navigation {...this.props}>
        {this._renderContent()}
      </Navigation>
    );
  }
}

export default MobileMenu;
