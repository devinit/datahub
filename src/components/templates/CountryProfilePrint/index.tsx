import * as React from 'react';
import { StateToShare } from '../../molecules/ChartShare';

interface Props {
  id?: string;
  rehydrated?: boolean;
  state?: StateToShare;
}

class CountryProfilePrint extends React.Component<Props> {
  render() {
    return (
      <div>
        Awesome!
      </div>
    );
  }
}

export default CountryProfilePrint;
