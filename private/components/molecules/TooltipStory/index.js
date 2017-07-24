// @flow
import React from 'react';
import type {Element} from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import glamourous from 'glamorous';

const HeaderContainer = glamourous.div({
  textAlign: 'right',
});
type Props = {
  children: any,
  trigger: Element<any>,
}
type State ={
  isOpen: boolean
}
class ToolTip extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  state: State;
  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <Popup
        trigger={this.props.trigger}
        on="click"
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="top right"
      >
        <Popup.Header>
          <HeaderContainer>
            <Icon name="close" onClick={this.handleClose} />
          </HeaderContainer>
        </Popup.Header>
        <Popup.Content>{this.props.children}</Popup.Content>
      </Popup>

    );
  }
}

export default ToolTip;
