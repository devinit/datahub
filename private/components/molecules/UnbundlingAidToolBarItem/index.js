/**
 * @flow
 */

import React from 'react';
import { Grid } from 'semantic-ui-react';
import Select from 'components/molecules/UnbundlingAidSelect';

type Props = {
  width: number,
  data: any,
  textAlign?: string,
};
const ToolBarItem = ({ width, data, textAlign }: Props) => (
  <Grid.Column width={width} textAlign={textAlign || 'right'} verticalAlign="middle">
    <span>ODA in
      <Select
        active
        bigText="2015"
        options={data.years}
      />
      <Select
        active
        bigText="All"
        smallText="to"
        options={data.countries}
      />
      <Select
        bigText="All"
        smallText="from"
        options={data.countries}
      />
      <Select
        bigText="All"
        smallText="sector"
        options={data.sectors}
      />
      <Select
        bigText="All"
        smallText="in the form of"
        options={data.forms}
      />
      <Select
        bigText="All"
        smallText="via channel"
        options={data.channels}
      />
    </span>
  </Grid.Column>
);

export default ToolBarItem;
