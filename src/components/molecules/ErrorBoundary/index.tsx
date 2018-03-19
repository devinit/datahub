import * as React from 'react';
import { ErrorInfo } from 'react';

export interface Props  {
  children: any;
  message?: string;
}

export default class ErrorBoundary extends React.Component<Props> {
  public state: {
    hasError: boolean,
    error: string,
    info?: string
  };
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: '', info: ''};
  }
  public componentDidCatch(error: Error, info: ErrorInfo) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
    // You can also log the error to an error reporting service
    // TODO: logErrorToMyService(error, info);
  }

  public render() {
    if (this.state.hasError) {
      console.error(this.state.error);
      // You can render any custom fallback UI
      return <h5 style={{textAlign: 'center', margin: '0 auto'}}>
              React component has an error! {this.props.message}
            </h5>;
    }
    return this.props.children;
  }
}
