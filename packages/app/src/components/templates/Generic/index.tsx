// @flow
/* eslint-disable react/no-danger */
import * as React from 'react';
import { Div } from 'glamorous';
import { Container } from 'semantic-ui-react';
import { Element } from 'react';
import Head from 'next/head';
import {PageMeta} from '@devinit/dh-base/lib/utils';
import {getPageMeta} from 'lib/utils';
import Footer from '@devinit/dh-ui/lib/molecules/Footer';
import Menu from '@devinit/dh-ui/lib/molecules/Menu';
import {menueData} from './data';

interface Props  {
  children?: Element<any>;
  pathname: string;
  query?: string;
}

export default ({ children, query, pathname}: Props) => {
  const pageMeta: PageMeta = getPageMeta({query: query || '', pathname});
  return (<Container fluid>
    <Head>
      <title>{pageMeta.title}</title>
    </Head>
    <Menu menu={menueData.mainMenu} />
    <Div marginTop={'4em'}>
      {children}
    </Div>
    <Footer />
  </Container>);
};
