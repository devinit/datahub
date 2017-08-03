/* eslint-disable react/no-danger */
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { renderStatic } from 'glamor/server';
// import 'lib/offline-install'; // Get our service worker on the page

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
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <link rel="stylesheet" href="/semantic/semantic.min.css" />
          <link rel="stylesheet" href="/css/di-charts.min.css" />
          <link rel="stylesheet" href="/css/mapbox-gl.min.css" />
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
