// @flow
import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import Wrapper from 'components/atoms/BubbleChartWidgetWrapper';
import glamorous from 'glamorous';

const Input = glamorous.input({
  width: '30%;'
});

const Link = glamorous.a({
  color: 'black',
});
const RangeWrapper = glamorous.div({
  marginTop: '1em',
  marginBottom: '1em',
});

type Props = {
  title: string,
  onScaleTypesChange?: (value: string | void) => void,
  onLatestChecked?: (value: string | void) => void,
  onMaxChanged?: (value: string | void) => void,
  onMinChanged?: (value: string | void) => void,
  onReset?: (value: string | void) => void,
  scaleTypes?: Array<Object>,
  min?: number,
  max?: number,
};

const ColorBy = ({ min,
  max,
  title,
  onMaxChanged,
  onMinChanged,
  onScaleTypesChange,
  onLatestChecked,
  onReset,
  scaleTypes}: Props) => (
    <Wrapper title={title}>
      <Dropdown onClick={onScaleTypesChange} selection fluid options={scaleTypes} />
      <RangeWrapper>
        Min <Input type="number" value={min} onChange={onMinChanged} />
        Max <Input type="number" value={max} onChange={onMaxChanged} />
      </RangeWrapper>
      <div><Link onClick={onReset}>reset</Link></div>
      <input type="checkbox" onChange={onLatestChecked} /> Latest
    </Wrapper>
);

export default ColorBy;
