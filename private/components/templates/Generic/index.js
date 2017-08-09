// @flow
import React from 'react';
import { Div } from 'glamorous';
import { Container } from 'semantic-ui-react';
import type { Element } from 'react';
import Footer from '../../molecules/Footer';
import Menu from '../../molecules/Menu';
import data from './data';

type Props = {
  children?: Element<any>,
};

export default ({ children }: Props) =>
  (<Container fluid>
    <Menu menu={data.mainMenu} />
    <Div marginTop={'4em'}>
      {children}
    </Div>
    <Footer />
  </Container>);
