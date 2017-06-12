// @flow
import React from 'react';
import glamorous from 'glamorous';
import type { Element } from 'react';
import Generic from '../Generic';

type Props = {
  children?: Element<any>,
};

export default ({ children}: Props) => {
  return (
    <Generic pathName="/">
      <span> children </span>
    </Generic>
  );
};
