import * as React from 'react';
import { ColorSpan } from '../BubbleChartHighlightRegions';
import Wrapper from '../BubbleChartWidgetWrapper';

export interface Props  {
  onChange?: (event: any) => void;
  options: Array<{color: string, name: string}>;
  colorBy: boolean;
}

export default ({ onChange, options, colorBy }: Props) =>
  (<Wrapper title="Highlight by Income Group">
    {options.map(item =>
      (<div key={item.name}>
        <input onChange={onChange} type="checkbox" value={item.name} />
        {colorBy ? <ColorSpan color={item.color} /> : false}
        {item.name}
      </div>),
    )}
  </Wrapper>);
