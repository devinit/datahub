// @flow
import React, {Component} from 'react';
import { Progress } from 'semantic-ui-react';

type Props = {
  loading: boolean,
}

export default class ProgressLoader extends Component {
  constructor(props: Props) {

  }
  componentWillReceiveProps(props: Props) {

  }
  render() {
    return (
      <Progress percent={10} size="tiny" />);
  }
}
