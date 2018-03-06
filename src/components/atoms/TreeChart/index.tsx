import * as React from 'react';
import visboxConfigs from '../../visbox/unbundlingTreemapChart';
import { draw } from '@devinit/charts';

export interface Props {
  data: object[];
  config?: object;
  width?: string;
  height?: string;
  onClick?: (d: any) => void;
}

class Chart extends React.Component<Props> {
  public props: Props;
  public element: HTMLDivElement | null;
  public chart: any;

  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    const element = this.element;
    const data = this.props.data;
    const config = this.props.config || visboxConfigs;

    draw({ element, data, config }).then(chart => {
      this.chart = chart;
      this.chart.onClick(this.props.onClick);
    });
  }

  public componentWillUpdate(props: Props) {
    if (this.chart) {
      this.chart.update(props.data);
    }
  }
  // the treemap overflows on zoon, overflow hidden here is a quick fix for that
  public render() {
    return (
      <div
        ref={element => {
          this.element = element;
        }}
        style={{ width: this.props.width, height: this.props.height, overflow: 'hidden' }}
      />
    );
  }
}

export default Chart;
