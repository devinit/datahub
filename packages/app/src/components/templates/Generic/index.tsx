import * as React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import {PageMeta, getPageMeta} from '../../../utils';
import Footer from '@devinit/dh-ui/lib/molecules/Footer';
import Menu from '@devinit/dh-ui/lib/molecules/Menu';
import Link from 'next/link';
import {menueData} from './data';

interface Props  {
  children: JSX.Element[] | React.ReactChild | React.ReactChildren | any; // screw it with any
  pathname: string;
  query?: string;
}

const Generic: React.SFC<Props> = ({ children, query, pathname}) => {
  const pageMeta: PageMeta = getPageMeta({query: query || '', pathname});
  return (<Container fluid>
    <Head>
      <title>{pageMeta.title}</title>
    </Head>
    <Menu menu={menueData.menu} nextLink={Link} />
    <div style={{marginTop: '4em'}}>
      {children}
    </div>
    <Footer />
  </Container>);
};

export default Generic;
