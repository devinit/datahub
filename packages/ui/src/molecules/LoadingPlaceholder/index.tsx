import * as React from 'react';
import { Div } from 'glamorous';
import { lighterGrey } from '../../theme/semantic';
import LoadingBar from '../LoadingBar';

export interface Props  {
  loading: boolean;
  height?: number | string;
}

const LoadingPlaceholder = (props: Props) =>
  (<div>
    <LoadingBar loading={props.loading} />
    <Div backgroundColor={lighterGrey} width={'100%'} height={props.height || '20em'}>
      <p>Loading...</p>
    </Div>
  </div>);

export default LoadingPlaceholder;
