import React from 'react';
import glamorous from 'glamorous';
import {Icon} from 'semantic-ui-react';
import {white, redHeaderColor} from 'components/theme/semantic';

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
    fontSize: '1.5rem',
    margin: '.28rem 0.25rem 0 0',

  },
  '@media(max-width: 960px)': {
    display: 'block',
  }
});
class MobileMenu extends React.Component {
  componentWillMount() {

  }
  render() {
    return (<ToggleButton>
      <Icon name="align justify" />
    </ToggleButton>);
  }


}
export default MobileMenu;
