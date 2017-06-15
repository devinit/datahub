// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {draw} from '@devinit/charts';

type Props = {
  data: [],
  config: {},
  width?: string,
  height?: string
}

class Chart extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    const element = ReactDOM.findDOMNode(this);
    const {data, config} = this.props;
    const chart = draw({element, data, config});
  }

  render() {
    return (
      <div style={{width: this.props.width, height: this.props.height}} />
    );
  }
}

export default Chart;
