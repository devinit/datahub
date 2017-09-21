// @flow
/* eslint-disable react/no-danger */
import React from 'react';
import { Div } from 'glamorous';
import { Container } from 'semantic-ui-react';
import type { Element } from 'react';
import Head from 'next/head';
import type {PageMeta} from 'lib/utils';
import {getPageMeta} from 'lib/utils';
import indexCss from 'criticalCss';
import unbundlingCss from 'criticalCss/unbundling'; // in private/criticalCss
import profileCss from 'criticalCss/countryProfile';
import Footer from 'components/molecules/Footer';
import Menu from 'components/molecules/Menu';
import {menueData} from './data';

type Props = {
  children?: Element<any>,
  pathname: string,
  query?: string
};
const setCriticalCss = (path?: string) => {
  if (!path) return indexCss;
  if (path.includes('unbundling')) return unbundlingCss;
  if (path === '/country') return profileCss;
  return indexCss;
};
export default ({ children, query, pathname}: Props) => {
  const pageMeta: PageMeta = getPageMeta({query: query || '', pathname});
  const criticalCss = setCriticalCss(pathname);
  return (<Container fluid>
    <Head>
      <title>{pageMeta.title}</title>
      <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
    </Head>
    <Menu menu={menueData.mainMenu} />
    <Div marginTop={'4em'}>
      {children}
    </Div>
    <Footer />
  </Container>);
};
