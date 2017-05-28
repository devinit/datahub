// @flow
import React from 'react';
import glamorous from 'glamorous';
import type { Element } from 'react';
import Menu from '../../organisms/Menu';

type Props = {
  children?: Element<any>,
  pathName: string
};

export default ({ children, pathName }: Props) => {
  const mainStyles = {
    backgroundColor: 'yellow',
    color: 'cornflowerblue',
    border: '1px solid lightgreen',
    borderRight: 'none',
    borderBottom: 'none',
    boxShadow: '5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow',
    transition: 'all 0.1s linear',
    margin: '3rem 0',
    padding: '1rem 0.5rem',
  };

  const Main = glamorous.div(mainStyles);

  return (
    <div>
      <Menu />
      <main>
        {children}
      </main>
    </div>
  );
};
