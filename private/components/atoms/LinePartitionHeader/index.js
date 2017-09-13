// @flow
import React from 'react';
import { Dropdown, Label, Segment } from 'semantic-ui-react';
import { SectionHeader } from 'components/atoms/Header/index';

type Props = {
  title: string,
  year: number,
  budgetType: string,
  budgetTypeOptions: Object[],
  currency: string,
  currencyOptions: Object[],
  onChangeCurrency(currency: string): void,
  onChangeBudgetType(budgetType: string): void,
};

const LinePartitionHeader = (props: Props) => {
  return (<Segment basic clearing style={{ paddingRight: 0, paddingLeft: 0 }}>
    <SectionHeader color="#fff" style={{ float: 'left' }}>
      {props.title} <span>{props.year}</span>
    </SectionHeader>

    <Segment basic floated={'right'} style={{ padding: 0, margin: 0 }}>
      <Label style={{background: 'transparent'}}>Budget Type</Label>
      <Dropdown
        selection
        value={props.budgetType}
        options={props.budgetTypeOptions}
        onChange={(e, data) => props.onChangeBudgetType(data.value)}
      />
      <Label style={{background: 'transparent'}}>Currency</Label>
      <Dropdown
        compact
        selection
        value={props.currency}
        options={props.currencyOptions}
        onChange={(e, data) => props.onChangeCurrency(data.value)}
      />
    </Segment>
  </Segment>);
};

export default LinePartitionHeader;
