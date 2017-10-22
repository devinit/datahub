// @flow
import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import { lightBlack, white } from 'components/theme/semantic';
import TabsToolTip from 'components/molecules/TabsToolTip';
import glamorous, {Div} from 'glamorous';

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

const SelectWrapper = glamorous.div({
  display: 'inline-block',
  '& .menu .text': {
    paddingLeft: '0.5em'
  },
  '& .selected :before': {
    content: '"✓ "',
    marginLeft: '-1em'
  },
  '& .ui.dropdown .menu>.item': {
    fontWeight: '500',
    fontSize: '1.1em'
  },
  '& .ui.selection, .ui.selection.dropdown, .ui.selection.dropdown:hover': {
    background: lightBlack,
    border: 'none',
  },
  '& .ui div:first-child, .ui.selection.visible.dropdown>.text:not(.default), .dropdown.icon': {
    color: white,
    fontWeight: 700,
    fontSize: '18px'
  }
});

const Wrapper = glamorous.div({
  textAlign: 'center',
  paddingTop: '.5em',
  paddingBottom: '.5em',
  background: lightBlack,
  '& .ui.selection.active.dropdown .menu': {
    borderRadius: '0.25em',
    marginTop: '-2em'
  },
  '& .ui.button': {
    fontWeight: '500',
    paddingTop: '.5em',
    paddingBottom: '.5em',
    paddingRight: '.85em',
    paddingLeft: '0.75em',
  },
  '& i.icon': {
    color: white
  },
});

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
