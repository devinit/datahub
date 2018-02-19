import * as React from 'react';
import glamorous , {GlamorousComponent} from 'glamorous';
import { Icon } from 'semantic-ui-react';
import { white, redHeaderColor } from '../../theme/semantic';
import MenuContainer from '../../atoms/MobileMenuContainer';
import {mediaQueries} from '../../theme';
import MenuItem from '../../atoms/MobileMenuItem';

export const ToggleButton: GlamorousComponent<any, any> = glamorous.button({
  'position': 'absolute',
  'display': 'none',
  'top': 0,
  'height': '4em',
  'width': '4em',
  'border': 0,
  'right': 0,
  'textAlign': 'center',
  'color': white,
  'background': redHeaderColor,
  'outline': 0,
  '& i': {
    fontSize: '1.2rem',
    margin: '.28rem 0.25rem 0 0',
  },
  [mediaQueries.tabs]: {
    display: 'block',
  },
});
export const OutSideMenu: GlamorousComponent<any, any> = glamorous.div<{open: boolean; }>(
  {
    background: '#fff',
    position: 'fixed',
    top: '4em',
    right: '0px',
    width: '100%',
    height: '100%',
    transition: 'all .3s',
  },
  props => ({
    opacity: props.open ? 0.5 : 0,
    display: props.open ? 'block' : 'none',
  }),
);

export interface Props {
  menu: any;
}

class MobileMenu extends React.Component<Props> {
  public state: {
    open: boolean,
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  public toggleNav() {
    return () => {
      if (this.state.open) {
        this.setState({ open: false });
      } else {
        this.setState({ open: true });
      }
    };
  }
  public render() {
    const { open } = this.state;
    const menuItems = this.props.menu.map(item => {
      return (
        <MenuItem
          menu={item}
          key={item.name}
        />
      );
    });
    return (
      <div>
        <ToggleButton onClick={this.toggleNav} >
          {open ? <Icon name="cancel" /> : <Icon name="align justify" />}
        </ToggleButton>
        <OutSideMenu onClick={this.toggleNav} open={open} />
        <MenuContainer open={open}>
          {menuItems}
        </MenuContainer>
      </div>
    );
  }
}
export default MobileMenu;
