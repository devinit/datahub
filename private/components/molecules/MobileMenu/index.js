import React from 'react';
import glamorous from 'glamorous';
import {Icon, List} from 'semantic-ui-react';
import {white, redHeaderColor, black, lightGrey} from 'components/theme/semantic';
import Menu from 'components/atoms/MobileMenu';
import MenuItem from 'components/atoms/MobileMenu/MobileMenuItem';

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

export const SubMenuContainer = glamorous.ul({
  listStyleType: 'none',
  color: black,
  margin: 0,
  padding: 0,
  '& li': {
    padding: '1rem 1.6rem',
    borderBottom: ` 1px solid ${lightGrey}`
  }
});
class MobileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
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
    return (<div>
      <ToggleButton onClick={() => this.toggleNav()}>
        { open ? <Icon name="cancel" /> : <Icon name="align justify" />}
      </ToggleButton>
      <Menu open={open}>
        <MenuItem label="Global Picture" url="" />
        <MenuItem label="Profiles" url="" hasSub>
          <SubMenuContainer>
            <li><a href=""><Icon name="area graph" />Country Profiles</a></li>
            <li><a href=""><Icon name="area graph" />Multilateral Profiles</a></li>
          </SubMenuContainer>
        </MenuItem>
        <MenuItem label="Unbudling Aid" url="" />
        <MenuItem label="Spotlight on Uganda" url="" />
        <MenuItem label="Other Visualizations" url="" hasSub>
          <SubMenuContainer>
            <li><a href=""><Icon name="barcode" />Unbundling other official flows</a></li>
            <li><a href=""><Icon name="users" />Where are the poor and where will they be?</a></li>
            <li><a href=""><Icon name="area graph" />Are domestic public resources able to meet the needs of the poorest people?</a></li>
            <li><a href=""><Icon name="area graph" />Different providers, different priorities</a></li>
          </SubMenuContainer>
        </MenuItem>
        <MenuItem label="Methodology" url="" />
      </Menu>
    </div>
    );
  }


}
export default MobileMenu;
