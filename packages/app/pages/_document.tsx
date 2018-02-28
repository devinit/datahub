import Document, { Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import { renderStatic } from 'glamor/server';
import indexCss from '../src/critical-css/home';
import unbundlingCss from '../src/critical-css/unbundling'; // in private/criticalCss
import profileCss from '../src/critical-css/countryProfile';
import {IProcess} from '@devinit/dh-base/lib/types';

declare const APP_VERSION: string;

const version = APP_VERSION;

export default class MyDocument extends Document {
  public static async getInitialProps({ renderPage, query, pathname }) {
    const page = renderPage();
    const styles = renderStatic(() => page.html);
    return { ...page, ...styles, query, pathname };
  }
  public static shouldHaveCriticalCss = (pathname: string): boolean => {
    if (pathname.includes('country') || pathname.includes('uganda')) return false;
    return true;
  }

  public static setCriticalCss = (path?: string) => {
    if (!path) return indexCss;
    if (path.includes('unbundling')) return unbundlingCss;
    if (path.includes('country')) {
      return profileCss;
    }
    return indexCss;
  }
  public static addVersionedCss = (pathname: string) =>
    MyDocument.shouldHaveCriticalCss(pathname) ?
      `
    () => {
      // loading styles async
      loadCSS('/semantic.min.css?v=${version}');
      loadCSS('/di-charts.min.css?v=${version}');
      loadCSS('/mapbox-gl.min.css?v=${version}');
    }` :
      `
    () => {
      // loading styles async
      loadCSS('/di-charts.min.css?v=${version}');
      loadCSS('/mapbox-gl.min.css?v=${version}');
    }`
  public props: any;
  constructor(props: any) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
  }

  public render() {
    const cssWithVersion = MyDocument.addVersionedCss(this.props.pathname);
    const criticalCss = MyDocument.setCriticalCss(this.props.pathname);
    return (
      <html lang="en">
        <Head>
          <meta name="theme-color" content="#e8443a" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <style type="text/css" key="critical" dangerouslySetInnerHTML={{ __html: criticalCss }} />
          <link rel="stylesheet" href={`/semantic.min.css?v=${version}`} />
          <style  dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <script
            dangerouslySetInnerHTML={{
              __html:
                // tslint:disable-next-line:max-line-length
                '!function(e){"use strict";var t=function(t,n,r){function o(e){return i.body?e():void setTimeout(function(){o(e)})}function a(){d.addEventListener&&d.removeEventListener("load",a),d.media=r||"all"}var l,i=e.document,d=i.createElement("link");if(n)l=n;else{var s=(i.body||i.getElementsByTagName("head")[0]).childNodes;l=s[s.length-1]}var u=i.styleSheets;d.rel="stylesheet",d.href=t,d.media="only x",o(function(){l.parentNode.insertBefore(d,n?l:l.nextSibling)});var f=function(e){for(var t=d.href,n=u.length;n--;)if(u[n].href===t)return e();setTimeout(function(){f(e)})};return d.addEventListener&&d.addEventListener("load",a),d.onloadcssdefined=f,f(a),d};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),function(e){if(e.loadCSS){var t=loadCSS.relpreload={};if(t.support=function(){try{return e.document.createElement("link").relList.supports("preload")}catch(e){return!1}},t.poly=function(){for(var t=e.document.getElementsByTagName("link"),n=0;n<t.length;n++){var r=t[n];"preload"===r.rel&&"style"===r.getAttribute("as")&&(e.loadCSS(r.href,r),r.rel=null)}},!t.support()){t.poly();var n=e.setInterval(t.poly,300);e.addEventListener&&e.addEventListener("load",function(){e.clearInterval(n)}),e.attachEvent&&e.attachEvent("onload",function(){e.clearInterval(n)})}}}(this);',
            }}
          />
          <script dangerouslySetInnerHTML={{ __html: `(${cssWithVersion})();` }} />
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
