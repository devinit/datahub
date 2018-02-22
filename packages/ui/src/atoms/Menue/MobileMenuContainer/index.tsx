import * as React from 'react';
import glamorous, {GlamorousComponent} from 'glamorous';
import {IProcess} from '@devinit/dh-base/lib/types';
import { white, redHeaderColor, midWhite, lightBlack } from '../../../theme/semantic';

declare var process: IProcess;

const Link = process.env && process.env.config && process.env.config.NEXT ? require('next/link') : null;

export interface Props  {
  children: React.ReactChild[];
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

class MobileMenu extends React.Component<Props> {
  public static defaultProps = {
    selected: 0,
  };
  public state: {
    selected?: any,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }
  public resetSelected() {
    this.setState({ selected: null });
  }
  public handleClick(child: any, index: number) {
    const that = this;
    return (event: any) => {
      event.preventDefault();
      if (child.props.hasSub) that.setState({ selected: index});
      if (that.state.selected === index) that.resetSelected();
    };
  }
  public _renderContent() {
    const items = (child, index) => {
      const activeClass = this.state.selected === index ? 'active' : '';
      const LinkContent =
        <a role="link">
          {child.props.label}
        </a>;
      return (
        <li
          key={index}
          className={`navigation__item ${activeClass}`}
          onClick={this.handleClick(child, index)}
        >
          <span className="navigation__item-title small">
            {
              Link ?
               <Link href={child.props.url || '#'} prefetch>
               {LinkContent}
              </Link>
              : <a href={child.props.url || '#'} > {LinkContent} </a>
          }
          </span>
          {child}
        </li>
      );
    };
    return this.props.children.map(items);
  }
  public render() {
    return (
      <Navigation open={this.props.open}>
        {this._renderContent()}
      </Navigation>
    );
  }
}

export default MobileMenu;
