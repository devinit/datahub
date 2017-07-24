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
          <title>Data hub</title>
          <meta name="theme-color" content="#e8443a" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="manifest" href="manifest.json" />
          <link rel="stylesheet" href="semantic/semantic.min.css" />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <link rel="preload" href="di-charts/di-charts.min.csss" as="style" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
