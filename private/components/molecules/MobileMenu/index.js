import React from 'react';
import glamorous from 'glamorous';
import {Icon} from 'semantic-ui-react';
import {white, redHeaderColor, lightGrey, lightBlack} from 'components/theme/semantic';

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

export const Navigation = glamorous.nav({
  position: 'fixed',
  top: '4em',
  right: 0,
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
  '& .navigation__item-title': {
    display: 'block',
    height: '4em',
    padding: '1.5rem 1.8rem 1.8rem 1.8rem',
    fontWeight: '700',
    background: lightGrey,
    cursor: 'pointer',
    color: lightBlack,
  }
}, (props) => ({
  transform: props.open ? 'translate(0,0)' : 'translate(100%,0)',
}));

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
      <Navigation onBlur={() => this.setState({open: false})} open={open}>
        <li className="navigation__item">
          <span className="navigation__item-title small">
            <a href="">Global Picture</a>
          </span>
        </li>
        <li className="navigation__item">
          <span className="navigation__item-title small">
            <a href="">Profiles</a>
          </span>
        </li>
        <li className="navigation__item">
          <span className="navigation__item-title small">
            <a href="">Unbundling Aid</a>
          </span>
        </li>
        <li className="navigation__item">
          <span className="navigation__item-title small">
            <a href="">Spotlight on Uganda</a>
          </span>
        </li>
        <li className="navigation__item">
          <span className="navigation__item-title small">
            <a href="">Other Visualizations</a>
          </span>
        </li>
        <li className="navigation__item">
          <span className="navigation__item-title small">
            <a href="">Methodology</a>
          </span>
        </li>
      </Navigation>
    </div>
    );
  }


}
export default MobileMenu;
