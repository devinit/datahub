import * as React from 'react';
import visboxConfigs from '../../visbox/unbundlingTreemapChart';
import { draw } from '@devinit/charts';

export interface Props {
  data: object[];
  config?: any;
  width?: string;
  height?: string;
  onClick?: (d: any) => void;
}

class Chart extends React.Component<Props> {
  public props: Props;
  public element: HTMLDivElement | null;
  public chart: any;
  public config: any;

  // the treemap overflows on zoon, overflow hidden here is a quick fix for that
  render() {
    return (
      <div
        ref={ element => { this.element = element; } }
        style={ { width: this.props.width, height: this.props.height } }
        className="overflow-hidden"
      />
    );
  }

  componentDidMount() {
    this.drawChart(this.props);
  }

  componentWillUpdate(props: Props) {
    if (this.chart) {
      if (props.data && props.data.length) {
        if (props.config && props.config.type === 'partition' && props.config.labeling) {
          this.chart.setLabeling(props.config.labeling);
        }
        this.chart.update(props.data);
      } else {
        this.chart.destroy();
        this.chart = undefined;
        this.removeElementChildren();
      }
    } else if (props.data && props.data.length) {
      this.drawChart(props);
    }
  }

  drawChart(props: Props) {
    const element = this.element;
    const data = props.data;
    this.config = props.config || visboxConfigs;
    draw({ element, data, config: this.config }).then(chart => {
      this.chart = chart;
      this.chart.onClick(props.onClick);
    });
  }

  private removeElementChildren() {
    if (this.element && this.element.hasChildNodes()) {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }
  }
}

export default Chart;
