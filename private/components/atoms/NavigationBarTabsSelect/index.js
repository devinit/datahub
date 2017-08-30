// @flow
import React from 'react';
import { Button } from 'semantic-ui-react';
import { Div } from 'glamorous';
import TabsToolTip from 'components/molecules/TabsToolTip';
import {Wrapper, StyledSelect} from './styled';

export type Option = {|
  key: string,
  value: string,
|};

export type Props = {
  options: Array<Option>,
  onChange?: (event: any) => void,
  showUsingThisViz?: boolean,
  toolTip?: { heading: string, source: string },
  onUsingThisVizHandler?: (event: any) => void,
};

const Select = ({ options, onChange, toolTip, onUsingThisVizHandler, showUsingThisViz }: Props) =>
  (<Wrapper>
    <StyledSelect onChange={event => (onChange ? onChange(event) : false)}>
      {options.map(item =>
        (<option value={item.key} key={item.key}>
          {item.value}
        </option>),
      )}
    </StyledSelect>
    {toolTip ? <TabsToolTip {...toolTip} /> : ''}
    <Div display={showUsingThisViz ? 'inline-block' : 'none'}>
      <Button
        size="medium"
        onClick={event => (onUsingThisVizHandler ? onUsingThisVizHandler(event) : false)}
      >
        Using this Visualization
      </Button>
    </Div>
  </Wrapper>);

export default Select;
