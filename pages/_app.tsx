import * as React from 'react';

class MyApp extends React.Component<{ title: string }> {
  render() {
    return <title>{ this.props.title }</title>;
  }
}

export default MyApp;
