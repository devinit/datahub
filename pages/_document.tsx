import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { PageMeta, getPageMeta, shouldHaveMapboxCss } from '../src/utils';
import { renderStatic } from 'glamor/server';

declare const APP_VERSION: string;

const version = APP_VERSION;

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

  render() {
    const pathname = this.props.__NEXT_DATA__ && this.props.__NEXT_DATA__.pathname || '/';
    const query = this.props.__NEXT_DATA__ && this.props.__NEXT_DATA__.query && this.props.__NEXT_DATA__.query.id ;
    const pageMeta: PageMeta = getPageMeta({ query, pathname });

    return (
      <html>
        <Head>
          <meta name="theme-color" content="#e8443a" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <title>{ pageMeta.title }</title>
          <style dangerouslySetInnerHTML={ { __html: this.props.css } } />
          {/* <style key="critical" dangerouslySetInnerHTML={{ __html: criticalCSS}} /> */ }
          <link as="style" href="/outdatedbrowser/outdatedbrowser.min.css" rel="stylesheet"/>
          <link as="style" href={ `/semantic.min.css?v${version}` } rel="stylesheet" />
          <link as="style" href={ `/di-charts.min.css?v${version}` } rel="stylesheet"/>
          { process.env.NODE_ENV !== 'production' ?
              <link as="style" href={ `/mapbox-gl.min.css?v${version}` } rel="stylesheet"/>
              :
              shouldHaveMapboxCss(pathname) ?
                  <link as="style" href={ `/mapbox-gl.min.css?v${version}` } rel="stylesheet"/>
                  : ''
          }
          { /* FIXME: Manual css imported in line below. Faced lots of headches trying to import css in next.js */ }
          <link href={ `/introjs.min.css?v${version}` } rel="stylesheet"/>
          <link href={ `/main.css?v${version}` } rel="stylesheet"/>
          <script async src="https://www.google-analytics.com/analytics.js" />
          <script
            dangerouslySetInnerHTML={ { __html: `
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', 'UA-80274731-1', 'auto');
            ga('send', 'pageview');
          ` } }
          />
          { /* <!-- Global site tag (gtag.js) - Google Analytics --> */ }
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-122244396-1"/>
          <script
            dangerouslySetInnerHTML={ { __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-122244396-1');`
            } }
          />
          <script async src="/outdatedbrowser/outdatedbrowser.min.js"/>

        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="outdated"/>
          <script
            dangerouslySetInnerHTML={ {
              __html: `
                //event listener form DOM ready
                function addLoadEvent(func) {
                    var oldonload = window.onload;
                    if (typeof window.onload != 'function') {
                        window.onload = func;
                    } else {
                        window.onload = function() {
                            if (oldonload) {
                                oldonload();
                            }
                            func();
                        }
                    }
                }
                //call function after DOM ready
                addLoadEvent(function(){
                    outdatedBrowser({
                        bgColor: '#f25648',
                        color: '#ffffff',
                        lowerThan: 'Edge',
                        languagePath: '/outdatedbrowser/lang/en.html'
                    })
                });
              `
            } }
          />
        </body>
      </html>
    );
  }
}
