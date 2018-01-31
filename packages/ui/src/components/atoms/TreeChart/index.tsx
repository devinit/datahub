// @flow
import * as React from 'react';
import { draw } from '@devinit/charts';

interface Props {
  data: object[];
  config: object;
  width?: string;
  height?: string;
  onClick?: (d: any) => void;
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
    const element = this.element;
    const data = this.props.data;
    const config = this.props.config;

    draw({ element, data, config }).then(chart => {
      this.chart = chart;
      this.chart.onClick(this.props.onClick);
    });
  }

  public componentWillUpdate(props: Props) {
    if (this.chart) {
      this.chart.update(props.data);
      // this.chart.setLabeling(props.config.labeling);
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
