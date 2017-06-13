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
  const mainStyles = {
    marginTop: '4em',
  };

  const Main = glamorous.div(mainStyles);
  return (
    <div>
      <Menu />
      <Main>
        {children}
      </Main>
      <Footer />
    </div>
  );
};
