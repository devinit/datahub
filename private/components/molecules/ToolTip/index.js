// @flow
import React from 'react';
import type { Element } from 'react';
import { Div } from 'glamorous';
import { Icon, Popup } from 'semantic-ui-react';

type Props = {
  children: any,
  color?: string,
  trigger: Element<any>,
};
type State = {
  isOpen: boolean,
};
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
          <Div textAlign="right">
            <Icon name="close" onClick={this.handleClose} color={this.props.color || 'black'} />
          </Div>
        </Popup.Header>
        <Popup.Content>
          {this.props.children}
        </Popup.Content>
      </Popup>
    );
  }
}

export default ToolTip;
