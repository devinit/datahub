// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { Progress } from 'semantic-ui-react';

type Props = {
  loading: boolean,
};
type State = {
  percent: number,
  time: number,
};
const LoaderContainer = glamorous.div(
  {
    position: 'fixed',
    top: 0,
    zIndex: 999999,
    opacity: 1,
    width: '100%',
    transition: 'opacity 0.3s ease-in-out',
    '& .ui.progress .bar ': {
      backgroundColor: 'white',
    },
  },
  props => ({
    opacity: !props.loading ? 0 : 1,
  }),
);

export default class LoadingBar extends Component {
  constructor(props: Props) {
    super(props);
    this.timeChange = 1000;
    this.percentChange = 20;
    this.state = { percent: 0, time: 0 };
  }
  state: State;
  componentDidMount() {
    if (this.props.loading && this.setState) this.launch();
    this.timeOutProgress();
  }
  componentWillReceiveProps(props: Props) {
    if (!props.loading) {
      return this.terminate();
    }
    this.setState({percent: 0, time: 0});
    this.launch();
    return this.timeOutProgress();
  }
  componentWillUnmount() {
    this.terminate();
  }
  progressInterval: any;
  timeOutInterval: any;
  timeChange: number;
  percentChange: number;
  launch() {
    this.progressInterval = setInterval(() => {
      const percent = this.state.percent + this.percentChange;
      const time = this.timeChange + this.state.time;
      // check if mounted
      if (this.setState) return this.setState({ percent, time });
      return this.terminate();
    }, this.timeChange);
  }
  timeOutProgress() {
    this.timeOutInterval = setTimeout(() => {
      if (this.progressInterval) clearInterval(this.progressInterval);
    }, this.timeChange * 4);
  }
  terminate() {
    clearInterval(this.progressInterval);
    clearInterval(this.timeOutInterval);
    this.setState({ percent: 100 });
  }
  render() {
    return (
      <LoaderContainer {...this.props}>
        <Progress percent={this.state.percent} size="tiny" active />
      </LoaderContainer>
    );
  }
}
