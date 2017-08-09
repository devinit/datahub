// @flow
import React from 'react';
import { ColorSpan } from 'components/atoms/BubbleChartHighlightRegions';
import Wrapper from 'components/atoms/BubbleChartWidgetWrapper';

type Props = {
  onChange?: (value: string | void) => void,
  options: Array<Object>,
  colorBy: boolean,
};

const HighlightByIncome = ({ onChange, options, colorBy }: Props) =>
  (<Wrapper title="Highlight by Income Group">
    {options.map(item =>
      (<div key={item.name}>
        <input onChange={onChange} type="checkbox" value={item.name} />
        {colorBy ? <ColorSpan color={item.color} /> : false}
        {item.name}
      </div>),
    )}
  </Wrapper>);

export default HighlightByIncome;
