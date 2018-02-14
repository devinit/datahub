import * as React from 'react';
import { draw } from '@devinit/charts';

export interface Props  {
  data: any;
  config: any;
  width?: string;
  height?: string;
  onYearChanged(year: string): void;
}

class Timeline extends React.Component<Props> {
  public chart: any;
  public props: Props;
  public element: HTMLDivElement | null;
  constructor(props: Props) {
    super(props);
  }

  public onYearChanged(year: string) {
    this.props.onYearChanged(year);
  }

  public componentDidMount() {
    const element = this.element;
    const data = this.props.data;
    const config = this.props.config;
    const chartx = draw({ element, data, config });

    chartx.then( chart => {
      this.chart = chart;
      chart.onAnchorMoved(this.onYearChanged.bind(this));
    });
  }

  public componentWillUpdate(props: Props) {
    if (this.chart) {
      this.chart.update(props.data);

      if (props.config.anchor.start !== this.props.config.anchor.start) {
        this.chart.moveAnchor(props.config.anchor.start.toString());
      }
    }
  }

  public render() {
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
