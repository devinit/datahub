import * as React from 'react';
import { Container } from 'semantic-ui-react';
// import Head from 'next/head';

import Footer from '../../molecules/Footer';
import {lighterGrey} from '../../theme/semantic';
import Menu from '../../molecules/Menu';
import Link from 'next/link';
import {menueData} from './data';

interface Props  {
  children: JSX.Element[] | React.ReactChild | React.ReactChildren | any; // screw it with any
  pathname: string;
  query?: string;
}

const Generic: React.SFC<Props> = ({ children, query, pathname}) =>
  <Container fluid>
      <Menu menu={menueData.menu} />
      <div style={{marginTop: '4em'}}>
        {children}
      </div>
      <Footer />
  </Container>;

export default Generic;
