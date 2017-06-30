import glamorous from 'glamorous';
import {Icon} from 'semantic-ui-react';
import React from 'react';
import { lightBlack } from 'components/theme/semantic';

const TabHeader = glamorous.div({
  backgroundColor: lightBlack,
  fontWeight: '700',
  paddingTop: '.5em',
  paddingBottom: '.5em',
});

export default TabHeader;
