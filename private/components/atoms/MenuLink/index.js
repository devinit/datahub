// @flow
import React from 'react';
import glamorous from 'glamorous';
import type { Element } from 'react';
import {Container, Icon} from 'semantic-ui-react';
import {white, red, black} from 'components/theme/semantic';
import {NavLink} from '../Link';

type Props = {
  children?: Element<any>,
  hasSubMenu: boolean,
  menu: string,
  link: string,
  icon?: string
};

export default ({ children, hasSubMenu, menu, icon, link}: Props) => {
  const LocalContainer = glamorous.span({
    height: '4em',
    float: 'left',
    color: white,
    position: 'relative',
    background: '0 0',
    paddingTop: '1.2em',
    paddingLeft: '0.8em',
    paddingRight: '0.8em',
    cursor: 'pointer',
    '& .item': {
      marginBottom: '12px',
    },
    '& i': {
      display: 'none',
      margin: '0',
      width: 'auto'
    },
    ':hover i': {
      display: 'block',
      margin: '0',
      width: 'auto'
    },
    ':hover div': {
      opacity: 1,
      visibility: 'visible',
    },
    ':hover': {
      background: red,
    }});
  const Drawer = glamorous.div({
    position: 'fixed',
    top: '3em',
    left: '0',
    color: black,
    width: '100%',
    height: 'auto',
    borderTop: `10px solid ${red}`,
    paddingTop: '1em',
    paddingBottom: '2em',
    background: white,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all .3s',
    transform: 'translate(0,10px)',
    boxShadow: '0 4px 6px rgba(0,0,0,.3)',
    '& i': {
      width: '1.18em',
    },
  });
  const ListContainer = glamorous.ul({
    columnCount: 2,
    listStyleType: 'none',
    margin: 0,
  });

  return (
    <LocalContainer>
      <NavLink href={link}>
        {hasSubMenu ? <Icon name="setting" /> : ''}
        {menu}</NavLink>
      {hasSubMenu ? <Drawer>
        <Container>
          <ListContainer>
            {children}
          </ListContainer>
        </Container>
      </Drawer> : ''}
    </LocalContainer>
  );
};
