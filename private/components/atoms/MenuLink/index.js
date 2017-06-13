// @flow
import React from 'react';
import glamorous from 'glamorous';
import type { Element } from 'react';
import {white, red} from 'components/theme/semantic';
import {NavLink} from '../Link';

type Props = {
  children?: Element<any>,
  hasSubMenu: boolean,
  menu: string,
  link: string,
  icon?: string
};

export default ({ children, hasSubMenu, menu, icon, link}: Props) => {
  const Container = glamorous.span({
    transition: 'transform .3s cubic-bezier(.215,.61,.355,1)',
    height: '4em',
    float: 'left',
    color: white,
    background: '0 0',
    paddingTop: '1.2em',
    paddingLeft: '0.8em',
    paddingRight: '0.8em',
    ':hover': {
      background: red,
    }
  });

  return (
    <Container>
      <NavLink href={link}>{menu}</NavLink>
    </Container>
  );
};
