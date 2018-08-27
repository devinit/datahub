import * as React from 'react';
import { Dropdown, Grid, Label, Segment } from 'semantic-ui-react';
import { SectionHeader } from '../../../atoms/Header/index';
import { Intro } from '../../../atoms/Intro';
import { howTo } from '../../../../utils/howTo';

export type onChangeT = (budgetType: string) => void;
export type onChangeC = (currency: string) => void;
export interface Props {
  title: string;
  hideOptions: boolean;
  year: number;
  budgetType: string;
  budgetTypeOptions: object[];
  currency: string;
  currencyOptions: object[];
  onChangeBudgetType: onChangeT;
  onChangeCurrency: onChangeC;
}
const _onChange = (onChange: onChangeT) => (_e, data) => onChange(data.value);
const _onChangeC = (onChange: onChangeC) => (_e, data) => onChange(data.value);

const LinePartitionHeader = (props: Props) => {
  return (
    <Grid>
      <Grid.Column width={ 16 } style={ { paddingLeft: 0, paddingRight: 0 } }>
        <Segment basic clearing style={ { paddingRight: 0, paddingLeft: 0 } }>
            <SectionHeader color="#fff" style={ { float: 'left' } }>
              <Intro step={ 1 } intro={ howTo.countryProfile.governmentFinance.breadCrumb }>
                { props.title } <span>{ props.year }</span>
              </Intro>
            </SectionHeader>
            { props.hideOptions ? '' : <Segment basic floated={ 'right' } style={ { padding: 0, margin: 0 } }>
            <Label style={ { background: 'transparent' } }>Budget Type</Label>
            <Dropdown
              selection
              value={ props.budgetType }
              options={ props.budgetTypeOptions }
              onChange={ _onChange(props.onChangeBudgetType) }
            />
            <Label style={ { background: 'transparent' } }>Currency</Label>
            <Dropdown
              compact
              selection
              value={ props.currency }
              options={ props.currencyOptions }
              onChange={ _onChangeC(props.onChangeCurrency) }
            />
          </Segment> }
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default LinePartitionHeader;
