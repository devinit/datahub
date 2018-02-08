import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import Wrapper from '../BubbleChartWidgetWrapper';
import glamorous from 'glamorous';
import { FormEvent } from 'react';

const Input = glamorous.input({
  width: '30%;',
});

const Link = glamorous.a({
  color: 'black',
});
const RangeWrapper = glamorous.div({
  marginTop: '1em',
  marginBottom: '1em',
});

interface Props  {
  title: string;
  onScaleTypesChange?: (event: any) => void;
  onLatestChecked?: (event: FormEvent<HTMLInputElement>) => void;
  onMaxChanged?: (value: FormEvent<HTMLInputElement>) => void;
  onMinChanged?: (value: FormEvent<HTMLInputElement>) => void;
  onReset?: (event: any) => void;
  scaleTypes?: object[];
  min?: number;
  max?: number;
}

const ColorBy = ({
  min,
  max,
  title,
  onMaxChanged,
  onMinChanged,
  onScaleTypesChange,
  onLatestChecked,
  onReset,
  scaleTypes,
  }: Props) =>
  (<Wrapper title={title}>
    <Dropdown onClick={onScaleTypesChange} selection fluid options={scaleTypes} />
    <RangeWrapper>
      Min <Input type="number" value={min} onChange={onMinChanged} />
      Max <Input type="number" value={max} onChange={onMaxChanged} />
    </RangeWrapper>
    <div>
      <Link onClick={onReset}>reset</Link>
    </div>
    <input type="checkbox" onChange={onLatestChecked} /> Latest
  </Wrapper>);

export default ColorBy;
