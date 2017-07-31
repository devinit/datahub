// @flow
import React from 'react';
import type { Element } from 'react';

type Props = {
  children: any,
};
type State = {
  tooltipActive: boolean,
}

class ToolTip extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      tooltipActive: false
    };
  }
  state: State;
  handleChange(active: boolean) {
    this.setState({
      tooltipActive: active
    });
  }
  render() {
    const nodes = this.props.children.map(child => {
      const props = {
        active: this.state.tooltipActive,
        onClick: () => this.handleChange(true),
      };
      return React.cloneElement(child, props);
    });
    return (
      <div className="Tooltip" >
        {nodes}
      </div>
    );
  }
}
export default ToolTip;
