/**
 * @flow
 */

import React from 'react';
import { Grid } from 'semantic-ui-react';
import Select from 'components/molecules/UnbundlingAidSelect';

type Props = {
  width: number,
  data: any,
  position?: number,
  values: string[],
  textAlign?: string,
  onChange(key: string, value: string): void,
};
const ToolBarItem = (props: Props) => {
  const {
    width,
    data,
    position = 0,
    values,
    textAlign,
    onChange = d => {}
  } = props;

  const keys = Object.keys(data);

  return (
    <Grid.Column width={width} textAlign={textAlign || 'right'} verticalAlign="middle">
      <span>ODA in
        <Select
          active
          value={values[keys.indexOf('years')]}
          options={data.years}
          onChange={d => onChange('years', d)}
        />
        <Select
          active={keys.indexOf('to') <= position}
          value={values[keys.indexOf('to')] || ''}
          smallText="to"
          options={data.to}
          onChange={d => onChange('to', d)}
        />
        <Select
          active={keys.indexOf('from') <= position}
          value={values[keys.indexOf('from')] || ''}
          smallText="from"
          options={data.from}
          onChange={d => onChange('from', d)}
        />
        <Select
          active={keys.indexOf('sectors') <= position}
          value={values[keys.indexOf('sectors')] || ''}
          smallText="sector"
          options={data.sectors}
          onChange={d => onChange('sectors', d)}
        />
        <Select
          active={keys.indexOf('forms') <= position}
          value={values[keys.indexOf('forms')] || ''}
          smallText="in the form of"
          options={data.forms}
          onChange={d => onChange('forms', d)}
        />
        <Select
          active={keys.indexOf('channels') <= position}
          value={values[keys.indexOf('channels')] || ''}
          smallText="via channel"
          options={data.channels}
          onChange={d => onChange('channels', d)}
        />
      </span>
    </Grid.Column>
  );
};

export default ToolBarItem;
