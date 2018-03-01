import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import {PageMeta, getPageMeta} from '../src/utils';
// import methodologyCSS from '../src/critical-css/methodology';
import { renderStatic } from 'glamor/server';

export default class MyDocument extends Document {
  public static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = renderStatic(() => page.html || page.errorHtml);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
  }
  // in production we only show critical css
  // in dev we use semantic, and extract css from it
  // using a css command line tool
  public render() {
    // const criticalCSS = methodologyCSS[0].css;
    const pageMeta: PageMeta =
      getPageMeta({query: this.props.query || '', pathname: this.props.pathname});
    return (
      <html>
        <Head>
        <link rel="stylesheet" href={`/semantic.min.css`} />
        <title>{pageMeta.title}</title>
        <style  dangerouslySetInnerHTML={{ __html: this.props.css }} />
          {/* {process.env.NODE_ENV === 'development' ?
            :
            <style key="critical" dangerouslySetInnerHTML={{ __html: criticalCSS}} />
          } */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
