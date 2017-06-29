// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Icon, List} from 'semantic-ui-react';
import {white, redHeaderColor, black, lightGrey} from 'components/theme/semantic';
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
  }
});

type Props = {
  menu: Array<any>,
};

class MobileMenu extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  state: {
    open: boolean,
  }
  toggleNav() {
    if (this.state.open) {
      this.setState({open: false});
    } else {
      this.setState({open: true});
    }
  }
  render() {
    const {open} = this.state;
    const menuItems = this.props.menu.map(item => {
      let hasSubMenu = false;
      if ('children' in item) {
        hasSubMenu = true;
      }
      return (<MenuItem
        menu={item}
        label={item.name}
        url={item.link}
        key={item.name}
        hasSub={hasSubMenu}
      />);
    });
/* eslint-disable flowtype-errors/show-errors */
    return (<div>
      <ToggleButton onClick={() => this.toggleNav()}>
        { open ? <Icon name="cancel" /> : <Icon name="align justify" />}
      </ToggleButton>
      <MenuContainer open={open}>
        {menuItems}
      </MenuContainer>
    </div>
    );
  }


}
export default MobileMenu;
