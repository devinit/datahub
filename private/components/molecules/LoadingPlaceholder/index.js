// @flow
import React from 'react';
import { Div } from 'glamorous';
import { lighterGrey } from 'components/theme/semantic';
import LoadingBar from 'components/molecules/LoadingBar';

type Props = {
  loading: boolean,
  height?: number | string,
};
const LoadingPlaceholder = (props: Props) =>
  (<div>
    <LoadingBar loading={props.loading} />
    <Div backgroundColor={lighterGrey} width={'100%'} height={props.height || '20em'} />
  </div>);

export default LoadingPlaceholder;
