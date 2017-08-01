// @flow
import React from 'react';
import { draw } from '@devinit/charts';
// import stylesheet from '@devinit/charts/dist/di-charts.min.css';
// import Nossr from 'react-no-ssr';
/* eslint-disable react/no-danger */

type Props = {
  data: any,
  config: {},
  width?: string,
  height?: string
}

class Chart extends React.Component {

  // eslint-disable-next-line react/sort-comp
  props: Props;
  element: Element;
  chart: any;

  // eslint-disable-next-line no-useless-constructor
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    const element = this.element;
    const data = this.props.data;
    const config = this.props.config;
    draw({element, data, config}).then(chart => { this.chart = chart; });
  }

  componentWillReceiveProps(props: Props) {
    if (props.data !== this.props.data && this.chart) {
      this.chart.addData(props.data);
    }
  }

  render() {
    return (
      <div>
        {/* <style dangerouslySetInnerHTML={{ __html: stylesheet }} /> */}
        {/* <Nossr onSSR={<p>{'loading...'}</p>}> */}
          <div
            ref={element => { this.element = element; }}
            style={{width: this.props.width, height: this.props.height}}
          />
        {/* </Nossr> */}
      </div>
    );
  }
}

export default Chart;
