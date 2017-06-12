// @flow
import React from 'react';
import glamorous from 'glamorous';
import type { Element } from 'react';
import Footer from '../../molecules/Footer';
import Menu from '../../molecules/Menu';


type Props = {
  children?: Element<any>,
  pathName: string
};

export default ({ children}: Props) => {
  return (
    <div>
      <Menu />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};
