// @flow
import React from 'react';
import { draw } from '@devinit/charts';

type Props = {
  data: any,
  config: any,
  width?: string,
  height?: string,
  onYearChanged(year: string): void,
};

class Timeline extends React.Component {
  // eslint-disable-next-line react/sort-comp
  chart: any;
  props: Props;
  element: Element;

  // eslint-disable-next-line no-useless-constructor
  constructor(props: Props) {
    super(props);
  }

  onYearChanged(year: string) {
    this.props.onYearChanged(year);
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    const element = this.element;
    const data = this.props.data;
    const config = this.props.config;
    const chart = draw({ element, data, config });

    chart.then(chart => {
      this.chart = chart;
      chart.onAnchorMoved(this.onYearChanged.bind(this));
    });
  }

  componentWillReceiveProps(props: Props) {
    if (this.chart) {
      const newSum = props.data.reduce((sum, d) => sum + d.value, 0);
      const oldSum = this.props.data.reduce((sum, d) => sum + d.value, 0);
      if (newSum !== oldSum) {
        this.chart.addData(props.data);
      }
      if (props.config.anchor.start !== this.props.config.anchor.start) {
        this.chart.moveAnchor(props.config.anchor.start.toString());
      }
    }
  }

  render() {
    return (
      <div
        ref={element => {
          this.element = element;
        }}
        style={{ width: this.props.width || '100%', height: this.props.height }}
      />
    );
  }
}

export default Timeline;
