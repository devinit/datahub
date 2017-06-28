// @flow
import React from 'react';
import { Grid } from 'semantic-ui-react';
import Select from 'components/molecules/UnbundlingAidSelect';

type Props = {
  width: number,
};

const ToolBarItem = ({ width }: Props) => (
  <Grid.Column width={width} textAlign="right" verticalAlign="middle">
    <span>ODA in
      <Select
        active
        bigText="2015"
        options={[{name: '1', value: 'test'}]}
      />
      <Select
        active
        bigText="All"
        smallText="to"
        options={[{name: '1', value: 'test'}]}
      />
      <Select
        bigText="All"
        smallText="from"
        options={[{name: '1', value: 'test'}]}
      />
      <Select
        bigText="All"
        smallText="sector"
        options={[{name: '1', value: 'test'}]}
      />
      <Select
        bigText="All"
        smallText="in the form of"
        options={[{name: '1', value: 'test'}]}
      />
      <Select
        bigText="All"
        smallText="via channel"
        options={[{name: '1', value: 'test'}]}
      />
    </span>
  </Grid.Column>
);

export default ToolBarItem;
