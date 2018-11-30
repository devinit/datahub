import { BarPlot, DataPoint, LinePlot } from '..';
import { BarChartProps } from '../../components/BarChart';
import { LineChartProps } from '../../components/LineChart';

export const setAttributes = (plot: BarPlot | LinePlot, props: BarChartProps | LineChartProps) => {
  const attributeKeys = props.data.reduce((attributes: string[], data: DataPoint) => {
    if (data.attributes) {
      const keys = Object.keys(data.attributes).filter(key => attributes.indexOf(key) === -1);

      return attributes.concat(keys);
    }

    return attributes;
  }, []);
  if (props.attributes) {
    Object.keys(props.attributes).forEach(attribute =>
      props.attributes && plot.attr(attribute, props.attributes[attribute]));
  }
  if (attributeKeys.length) {
    attributeKeys.forEach(attribute => {
      plot.attr(attribute, d => {
        if (d.attributes) {
          return d.attributes[attribute];
        } else if (props.attributes) {
          return props.attributes[attribute];
        }

        return null;
      });
    });
  }
};
