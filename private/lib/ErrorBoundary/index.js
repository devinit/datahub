// @flow
// for when we migrate to react 16
import React from 'react';

type Props = {
  children: any;
}

export default class ErrorBoundary extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: '', info: ''};
  }
  state: {
    hasError: boolean,
    error: string,
    info?: string
  }
  componentDidCatch(error: string, info: string) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
    // You can also log the error to an error reporting service
    // TODO: logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h2>Something went wrong! </h2>;
    }
    return this.props.children;
  }
}
