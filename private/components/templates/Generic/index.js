// @flow
import React from 'react';
import { Div } from 'glamorous';
import { Container } from 'semantic-ui-react';
import type { Element } from 'react';
import Head from 'next/head';
import type {PageMeta} from 'lib/utils';
import {getPageMeta} from 'lib/utils';
import Footer from 'components/molecules/Footer';
import Menu from 'components/molecules/Menu';
import data from './data';

type Props = {
  children?: Element<any>,
  pathname: string,
  query?: string
};

export default ({ children, pathname, query }: Props) => {
  const pageMeta: PageMeta = getPageMeta({query, pathname});
  return (<Container fluid>
    <Head>
      <title>{pageMeta.title}</title>
    </Head>
    <Menu menu={data.mainMenu} />
    <Div marginTop={'4em'}>
      {children}
    </Div>
    <Footer />
  </Container>);
};
