// @flow
import React from 'react';
import type { Element } from 'react';

type Props = {
  children: any,
};
type State = {
  tooltipActive: boolean,
}

class Tooltip extends React.Component {

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
        tooltipActive: this.state.tooltipActive,
        handleChange: (change) => this.handleChange(change),
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
export default Tooltip;
