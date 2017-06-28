// @flow
import glamorous from 'glamorous';
import {Icon} from 'semantic-ui-react';
import Pane from 'components/atoms/MobileMenuPane';
import React from 'react';
import {lightGrey, black} from 'components/theme/semantic';

const SubMenuContainer = glamorous.ul({
  listStyleType: 'none',
  color: black,
  margin: 0,
  padding: 0,
  '& li': {
    padding: '1rem 1.6rem',
    borderBottom: ` 1px solid ${lightGrey}`
  }
});
const menuItem = (props: Object) => {
  let children = '';
  let hasSubMenu = false;
  if ('children' in props.menu) {
    children = props.menu.children.map(item => (
      <li key={item.name}>
        <a href={item.link}>
          <Icon name={item.icon} />
          {item.name}
        </a>
      </li>));
    children = <SubMenuContainer>{children}</SubMenuContainer>;
    hasSubMenu = true;
  }
  return (
    <Pane label={props.menu.name} url={props.menu.link} hasSub={hasSubMenu}>
      {children}
    </Pane>);
};

export default menuItem;
