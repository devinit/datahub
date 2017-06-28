// @flow
import glamorous from 'glamorous';
import {white} from 'components/theme/semantic';
import MenuItem from 'components/atoms/DesktopMenuItem';
import React from 'react';


const ListContainer = glamorous.ul({
  flexDirection: 'column',
  color: white,
  alignSelf: 'flex-end',
  listStyleType: 'none',
  float: 'right',
  margin: '0',
  '@media(max-width: 960px)': {
    display: 'none',
  }
});

const menu = (props: Object) => {
  const menuItems = props.menuItems.map(item => <MenuItem menu={item} />);
  return <ListContainer>{menuItems}</ListContainer>;
};

export default menu;
