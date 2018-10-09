import * as React from 'react';
import { draw } from '@devinit/charts';

export interface Props {
  data: any[];
  config: any;
  width?: string;
  height?: string;
  recreate?: boolean;
  onYearChanged(year: string): void;
}

class Timeline extends React.Component<Props> {
  public chart: any;
  public props: Props;
  public element: HTMLDivElement | null;

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div
        ref={ element => { this.element = element; } }
        style={ { width: this.props.width || '100%', height: this.props.height } }
      />
    );
  }

  componentDidMount() {
    this.renderChart(this.props);
  }

  componentWillUpdate(props: Props) {
    if (this.chart) {
      if (props.recreate) {
        this.chart.destroy();
        this.renderChart(props);
      } else {
        this.chart.update(props.data);

        if (props.config.anchor.start !== this.props.config.anchor.start) {
          this.chart.moveAnchor(props.config.anchor.start.toString());
        }
      }
    }
  }

  private renderChart(props: Props) {
    const element = this.element;
    const data = props.data;
    const config = props.config;
    const chart = draw({ element, data, config });
    chart.then(xchart => {
      this.chart = xchart;
      xchart.onAnchorMoved(props.onYearChanged);
    });
  }
}

export default Timeline;
