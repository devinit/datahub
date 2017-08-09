// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { Icon } from 'semantic-ui-react';
import { white, redHeaderColor } from 'components/theme/semantic';
import MenuContainer from 'components/atoms/MobileMenuContainer';
import MenuItem from 'components/atoms/MobileMenuItem';

export const ToggleButton = glamorous.button({
  position: 'absolute',
  display: 'none',
  top: 0,
  height: '4em',
  width: '4em',
  border: 0,
  right: 0,
  textAlign: 'center',

  color: white,
  background: redHeaderColor,
  outline: 0,
  '& i': {
    fontSize: '1.2rem',
    margin: '.28rem 0.25rem 0 0',
  },
  '@media(max-width: 960px)': {
    display: 'block',
  },
});
export const OutSideMenu = glamorous.div(
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

type Props = {
  menu: Array<any>,
};

class MobileMenu extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  state: {
    open: boolean,
  };
  toggleNav() {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  }
  render() {
    const { open } = this.state;
    const menuItems = this.props.menu.map(item => {
      let hasSubMenu = false;
      if ('children' in item) {
        hasSubMenu = true;
      }
      return (
        <MenuItem
          menu={item}
          label={item.name}
          url={item.link}
          key={item.name}
          hasSub={hasSubMenu}
        />
      );
    });
    /* eslint-disable flowtype-errors/show-errors */
    return (
      <div>
        <ToggleButton onClick={() => this.toggleNav()}>
          {open ? <Icon name="cancel" /> : <Icon name="align justify" />}
        </ToggleButton>
        <OutSideMenu onClick={() => this.toggleNav()} open={open} />
        <MenuContainer open={open}>
          {menuItems}
        </MenuContainer>
      </div>
    );
  }
}
export default MobileMenu;
