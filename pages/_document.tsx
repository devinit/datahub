import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import {PageMeta, getPageMeta} from '../src/utils';
// import criticalCSS from '../src/critical-css/critical';
import { renderStatic } from 'glamor/server';

declare const APP_VERSION: string;

const version = APP_VERSION;

export default class MyDocument extends Document {
  public static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = renderStatic(() => page.html || page.errorHtml);
    return { ...page, ...styles };
  }
  public shouldHaveMapboxCss: string[];
  public shouldHaveChartsCss: string[];
  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
    this.shouldHaveMapboxCss =
      ['/country', '/kenya', '/uganda', '/spotlight-on-kenya', '/spotlight-on-uganda', '/'];
  }
  public render() {
    const pathname = this.props.__NEXT_DATA__.pathname;
    const query = this.props.__NEXT_DATA__.query;
    const pageMeta: PageMeta = getPageMeta({query, pathname});
    return (
      <html>
        <Head>
        <meta name="theme-color" content="#e8443a" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{pageMeta.title}</title>
        <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        {/* <style key="critical" dangerouslySetInnerHTML={{ __html: criticalCSS}} /> */}
        <link as="style" href={`/semantic.min.css?v${version}`} rel="stylesheet" />
        <link as="style" href={`/di-charts.min.css?v${version}`} rel="stylesheet"/>
        {process.env.NODE_ENV !== 'production' ?
            <link as="style" href={`/mapbox-gl.min.css?v${version}`} rel="stylesheet"/>
            :
          this.shouldHaveMapboxCss.includes(pathname) ?
               <link as="style" href={`/mapbox-gl.min.css?v${version}`} rel="stylesheet"/>
               : ''
        }
        <script async src="https://www.google-analytics.com/analytics.js" />
        <script
          dangerouslySetInnerHTML={{ __html: `
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', 'UA-80274731-1', 'auto');
          ga('send', 'pageview');
        ` }}
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
