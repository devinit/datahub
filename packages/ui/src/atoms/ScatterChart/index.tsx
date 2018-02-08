import * as React from 'react';
import { draw } from '@devinit/charts';

interface Props  {
  data: any;
  config: {};
  width?: string;
  height?: string;
}

class ScatterChart extends React.Component<Props> {
  public props: Props;
  public element: HTMLDivElement | null;
  public chart: any;

  constructor(props: Props) {
    super(props);
  }

  public componentWillMount() {
    const element = this.element;
    const data = this.props.data;
    const config = this.props.config;
    draw({ element, data, config }).then(chart => {
      this.chart = chart;
    });
  }

  public componentWillReceiveProps(props: Props) {
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

export default ScatterChart;
