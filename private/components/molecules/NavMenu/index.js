// @flow
import glamorous from 'glamorous';
import React from 'react';
import Nav from '../NavItem';

type Props = {
  links: Array<{path: string, pathName: string, id: number}>,
  current: string,
};

const StyledHeader = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#ddd',
  padding: 16,
});

const NavMenu = ({ links, current }: Props) => {
  return (
    <StyledHeader>
      {links.map(({ path, pathName, id }) => (
        <Nav
          path={path}
          pathName={pathName}
          key={id}
          isActive={path === current}
        />
      ))}
    </StyledHeader>
  );
};

export default NavMenu;
