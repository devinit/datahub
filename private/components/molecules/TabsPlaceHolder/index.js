// @flow
import React from 'react';
import {Div} from 'glamorous';
import {lighterGrey} from 'components/theme/semantic';
import LoadingBar from 'components/molecules/LoadingBar';

type Props = {
  loading: boolean
}
const TabsPlaceHolder = (props: Props) => (
  <div>
    <LoadingBar loading={props.loading} />
    <Div backgroundColor={lighterGrey} width={'100%'} height={'20em'} />
  </div>);

export default TabsPlaceHolder;
