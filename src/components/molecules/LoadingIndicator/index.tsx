import * as React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

interface Props {
  height: string;
  inverted?: boolean;
}

export const LoadingIndicator: React.SFC<Props> = props => {
  return (
    <Segment
      style={ {
        width: '100%',
        height: props.height
      } }
    >
      <Dimmer active inverted={ props.inverted }>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
  );
};

LoadingIndicator.defaultProps = {
  inverted: true
};
