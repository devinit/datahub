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
      child.props.tooltipActive = this.state.tooltipActive;
      child.props.handleChange = this.handleChange.bind(this);
      if(this.isMounted()) {
        child.props.position = this.getDOMNode().getBoundingClientRect();
      }
      return child;
    });
    return (
      <div className="Tooltip" >
        {nodes}
      </div>
    );
  }
}
export default Tooltip;
