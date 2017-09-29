// @flow
import React from 'react';
import { Grid } from 'semantic-ui-react';
import Select from 'components/molecules/UnbundlingAidSelect';

type Props = {
  aid: string,
  width: number,
  data: any,
  position?: number,
  values: string[],
  textAlign?: string,
  onChange?: (key: string, value: string) => void,
};
/* eslint-disable no-unused-vars */
const ToolBarItem = (props: Props) => {
  const {
    width,
    data,
    position = 0,
    values,
    textAlign,
    aid,
    onChange = (key, value) => {
      // TOFIX: @ernest why is this here yet its unused
    },
  } = props;

  const keys = Object.keys(data);

  return (
    <Grid.Column width={width} textAlign={textAlign || 'right'} verticalAlign="middle">
      <span>
        {aid}
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
