import * as React from 'react';
import glamorous, { GlamorousComponent } from 'glamorous';
import { lightBlack, midWhite, redHeaderColor, white } from '../../../theme/semantic';
import { LinkState } from 'next/link';

export interface Props {
  children: React.ReactChild[];
  nextLink?: React.ComponentClass<LinkState>;
  selected?: number;
  open?: boolean;
}

export const Navigation: GlamorousComponent<any, any> = glamorous.nav<{open?: boolean}>(
  {
    'position': 'fixed',
    'top': '4em',
    'right': '-14px',
    'width': '23em',
    'height': '100%',
    'borderTop': `10px solid ${redHeaderColor}`,
    'paddingBottom': '4em',
    'overflow': 'scroll',
    'background': white,
    'boxShadow': '0 4px 6px rgba(0,0,0,.3)',
    'transform': 'translate(100%,0)',
    'transition': 'all .3s',
    '& .navigation__item': {
      position: 'relative',
      display: 'block',
      marginBottom: '2px',
      height: '4em',
      overflow: 'hidden'
    },
    '& li.active': {
      height: 'auto',
      overflow: 'vissible'
    },
    '& .navigation__item-title': {
      display: 'block',
      height: '4em',
      padding: '1.5rem 1.8rem 1.8rem 1.8rem',
      fontWeight: '700',
      background: midWhite,
      cursor: 'pointer',
      color: lightBlack
    }
  },
  props => ({
    transform: props.open ? 'translate(0,0)' : 'translate(100%,0)'
  })
);

class MobileMenu extends React.Component<Props> {
  public static defaultProps = {
    selected: 0
  };
  public state: {
    selected?: any
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: props.selected
    };
  }

  render() {
    return (
      <Navigation open={ this.props.open }>
        { this.renderContent() }
      </Navigation>
    );
  }

  renderContent() {
    const items = (child, index) => {
      const activeClass = this.state.selected === index ? 'active' : '';

      return (
        <li
          key={ index }
          className={ `navigation__item ${activeClass}` }
          onClick={ this.handleClick(child, index) }
        >
          <span className="navigation__item-title small">
            {
              this.props.nextLink
                ?
                <this.props.nextLink href={ child.props.menu.link || '' } prefetch>
                  <a role="link">{ child.props.menu.name }</a>
                </this.props.nextLink>
                :
                <a href={ child.props.menu.link || '#' }>{ child.props.menu.name }</a>
          }
          </span>
          { child }
        </li>
      );
    };

    return this.props.children.map(items);
  }

  resetSelected() {
    this.setState({ selected: null });
  }

  handleClick(child: any, index: number) {
    return (event: any) => {
      if (child.props.menu.children) {
        if (this.state.selected !== index) {
          event.preventDefault();
        }
        this.setState({ selected: index });
      }
      if (this.state.selected === index) { this.resetSelected(); }
    };
  }
}

export default MobileMenu;
