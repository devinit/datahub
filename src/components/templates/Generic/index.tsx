import Link from 'next/link';
import * as React from 'react';
import { Container } from 'semantic-ui-react';
import Banner from '../../molecules/Banner/Banner';
import Footer from '../../molecules/Footer';
import Menu from '../../molecules/Menu';
import { menuData } from './data';

interface Props {
  children: JSX.Element[] | React.ReactChild | React.ReactChildren | any; // screw it with any
}

const Generic: React.SFC<Props> = ({ children }) =>
  <Container fluid>
    <Menu menu={ menuData.menu } nextLink={ Link } />
    <div style={ { marginTop: '4em' } }>
      <Banner/>
      { children }
    </div>
    <Footer />
  </Container>;

export default Generic;
