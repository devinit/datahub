import React from 'react';
import { P } from 'glamorous';
import { big } from 'components/theme';
import { red } from 'components/theme/semantic';

const noData = () =>
  (<P fontSize={big} fontWeight={'bold'} color={red}>
    No data
  </P>);

export default noData;
