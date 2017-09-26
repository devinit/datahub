// @flow
/* eslint-disable react/no-danger */
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { renderStatic } from 'glamor/server';
import {version} from 'package.json';
import indexCss from 'criticalCss';
import unbundlingCss from 'criticalCss/unbundling'; // in private/criticalCss
import profileCss from 'criticalCss/countryProfile';
// import 'lib/offline-install'; // Get our service worker on the page

declare var loadCSS: any;
export default class MyDocument extends Document {
  static async getInitialProps({ renderPage, query, pathname }) {
    const page = renderPage();
    const styles = renderStatic(() => page.html);
    return { ...page, ...styles, query, pathname };
  }
  static shouldHaveCriticalCss = (pathname: string): boolean => {
    if (pathname.includes('country') || pathname.includes('uganda')) return false;
    return true;
  }

  static setCriticalCss = (path?: string) => {
    if (!path) return indexCss;
    if (path.includes('unbundling')) return unbundlingCss;
    if (path.includes('country')) {
      return profileCss;
    }
    return indexCss;
  };
  static addVersionedCss = (pathname: string) =>
    MyDocument.shouldHaveCriticalCss(pathname) ?
      `
    () => {
      // loading styles async
      loadCSS('/semantic/semantic.min.css?v=${version}');
      loadCSS('/css/di-charts.min.css?v=${version}');
      loadCSS('/css/mapbox-gl.min.css?v=${version}');
    }` :
      `
    () => {
      // loading styles async
      loadCSS('/css/di-charts.min.css?v=${version}');
      loadCSS('/css/mapbox-gl.min.css?v=${version}');
    }`;

  constructor(props: any) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
  }

  render() {
    const cssWithVersion = MyDocument.addVersionedCss(this.props.pathname);
    const criticalCss = MyDocument.setCriticalCss(this.props.pathname);
    return (
      <html lang="en">
        <Head>
          <meta name="theme-color" content="#e8443a" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          {!MyDocument.shouldHaveCriticalCss(this.props.pathname) ?
            <link rel="stylesheet" href={`/semantic/semantic.min.css?v=${version}`} /> :
            <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
          }
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <script
            dangerouslySetInnerHTML={{
              __html:
                '!function(e){"use strict";var t=function(t,n,r){function o(e){return i.body?e():void setTimeout(function(){o(e)})}function a(){d.addEventListener&&d.removeEventListener("load",a),d.media=r||"all"}var l,i=e.document,d=i.createElement("link");if(n)l=n;else{var s=(i.body||i.getElementsByTagName("head")[0]).childNodes;l=s[s.length-1]}var u=i.styleSheets;d.rel="stylesheet",d.href=t,d.media="only x",o(function(){l.parentNode.insertBefore(d,n?l:l.nextSibling)});var f=function(e){for(var t=d.href,n=u.length;n--;)if(u[n].href===t)return e();setTimeout(function(){f(e)})};return d.addEventListener&&d.addEventListener("load",a),d.onloadcssdefined=f,f(a),d};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),function(e){if(e.loadCSS){var t=loadCSS.relpreload={};if(t.support=function(){try{return e.document.createElement("link").relList.supports("preload")}catch(e){return!1}},t.poly=function(){for(var t=e.document.getElementsByTagName("link"),n=0;n<t.length;n++){var r=t[n];"preload"===r.rel&&"style"===r.getAttribute("as")&&(e.loadCSS(r.href,r),r.rel=null)}},!t.support()){t.poly();var n=e.setInterval(t.poly,300);e.addEventListener&&e.addEventListener("load",function(){e.clearInterval(n)}),e.attachEvent&&e.attachEvent("onload",function(){e.clearInterval(n)})}}}(this);',
            }}
          />
          <script dangerouslySetInnerHTML={{ __html: `(${cssWithVersion})();` }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
