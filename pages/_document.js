/* eslint-disable react/no-danger */
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { renderStatic } from 'glamor/server';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = renderStatic(() => page.html);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>With Glamorous</title>
          <meta name="theme-color" content="#673ab7" />
          <link rel="manifest" href="manifest.json" />
          <link rel="stylesheet" href="semantic/semantic.min.css" />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
