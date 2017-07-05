// @flow
import React from 'react';
import { Header } from 'semantic-ui-react';
import {ColorSpan} from 'components/atoms/HighlightRegions';
import {Wrapper} from 'components/atoms/BubbleSizeDropDown';

type Props = {
  onChange?: (value: string | void) => void,
  options: Array<Object>,
  colorBy: boolean
};

const HighlightByIncome = ({ onChange, options, colorBy }: Props) => (
  <Wrapper>
    <Header as="h4">Highlight by Income Group</Header>
    {options.map(item => <div key={item.name}><input onChange={onChange} type="checkbox" value={item.name} />{colorBy ? <ColorSpan color={item.color} /> : false}{item.name}</div>)}
  </Wrapper>
);

export default HighlightByIncome;
