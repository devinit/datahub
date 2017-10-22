// @flow
import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import TabsToolTip from 'components/molecules/TabsToolTip';
import { Div } from 'glamorous';
import { SelectWrapper, Wrapper } from './styles';

export type Option = {|
  key: string,
  value: string,
  text: ?string,
|};

export type Props = {
  options: Array<Option>,
  activeIndicator: string,
  onChange?: (event: any, data: Option[]) => void,
  showUsingThisViz?: boolean,
  toolTip?: { heading: string, source: string },
  onUsingThisVizHandler?: (event: any) => void,
};

const Select = (props: Props) => {
  const { options, onChange, toolTip, onUsingThisVizHandler,
    showUsingThisViz, activeIndicator } = props;
  return (<Wrapper id="menu-override">
    <SelectWrapper>
      <Dropdown
        selection
        scrolling
        fluid
        options={options}
        onChange={(event, data) => (onChange ? onChange(event, data.options) : false)}
        value={activeIndicator}
      />
    </SelectWrapper>
    {toolTip ? <TabsToolTip {...toolTip} /> : ''}
    <Div display={showUsingThisViz ? 'inline-block' : 'none'}>
      <Button
        size="medium"
        onClick={(event) =>
          (onUsingThisVizHandler ? onUsingThisVizHandler(event) : false)}
      >
        Using this Visualization
      </Button>
    </Div>
  </Wrapper>);
};

export default Select;
