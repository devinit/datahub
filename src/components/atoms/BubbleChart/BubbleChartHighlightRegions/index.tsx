import * as React from 'react';
import glamorous, {GlamorousComponent} from 'glamorous';
import Wrapper from '../BubbleChartWidgetWrapper';

export const ColorSpan: GlamorousComponent<any, any> = glamorous.span<{color: string}>(
  {
    display: 'inline-block',
    width: '10px',
    height: '10px',
  },
  props => ({
    backgroundColor: props.color || '#7f7f7f',
    marginLeft: '2px',
    marginRight: '2px',
  }),
);

export interface Props  {
  onChange?: (event: any) => void;
  options: Array<{color: string, name: string}>;
  colorBy: boolean;
}

export default ({ onChange, options, colorBy }: Props) =>
  (<Wrapper title="Highlight by Region">
    {options.map(item =>
      (<div key={item.name}>
        <input onChange={onChange} type="checkbox" value={item.name} />
        {colorBy ? <ColorSpan color={item.color} /> : false}
        {item.name}
      </div>),
    )}
  </Wrapper>);
