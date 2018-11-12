import * as React from 'react';
import { draw } from '@devinit/charts';
// import stylesheet from '@devinit/charts/dist/di-charts.min.css';
/* eslint-disable react/no-danger */

export interface Props {
  data: any;
  config: {};
  width?: string;
  height?: string;
}

class Chart extends React.Component <Props> {
  public props: Props;
  public element: HTMLDivElement | null;
  public chart: any;

  render() {
    return (
      <div
        className="di-chart"
        ref={ element => { this.element = element; } }
        style={ { width: this.props.width, height: this.props.height } }
      />
    );
  }

  componentDidMount() {
    const element = this.element;
    const { data, config } = this.props;
    draw({ element, data, config }).then(chart => {
      this.chart = chart;
    });
  }

  componentWillUpdate(props: Props) {
    if (this.chart) {
      this.chart.update(props.data);
    }
  }
}

export default Chart;
