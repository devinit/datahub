// @flow
import * as React from 'react';
import { draw } from '@devinit/charts';
// import stylesheet from '@devinit/charts/dist/di-charts.min.css';
/* eslint-disable react/no-danger */

interface Props  {
  data: any;
  config: {};
  width?: string;
  height?: string;
}

class Chart extends React.Component {
  // eslint-disable-next-line react/sort-comp
  public props: Props;
  public element: Element;
  public chart: any;

  // eslint-disable-next-line no-useless-constructor
  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    const element = this.element;
    const data = this.props.data;
    const config = this.props.config;
    draw({ element, data, config }).then(chart => {
      this.chart = chart;
    });
  }

  public componentWillUpdate(props: Props) {
    if (this.chart) {
      this.chart.update(props.data);
    }
  }
  public render() {
    return (
      <div
        ref={element => {
          this.element = element;
        }}
        style={{ width: this.props.width, height: this.props.height }}
      />
    );
  }
}

export default Chart;
