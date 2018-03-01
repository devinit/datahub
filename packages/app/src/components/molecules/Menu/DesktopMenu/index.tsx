import glamorous from 'glamorous';
import { white } from '../../../theme/semantic';
import {mediaQueries} from '../../../theme';
import {DesktopMenuItem} from '../../../atoms/Menu';
import {Props} from '../';
import * as React from 'react';

const ListContainer = glamorous.ul({
  flexDirection: 'column',
  color: white,
  alignSelf: 'flex-end',
  listStyleType: 'none',
  paddingTop: '0.2em',
  margin: '0',
  [mediaQueries.phone]: {
    display: 'none',
  },
  [mediaQueries.tabs]: {
    display: 'none',
  },
});

const menu = (props: Props) => {
  const menuItems = props.menu.map(item =>
    <DesktopMenuItem key={item.name} menu={item} nextLink={props.nextLink} />
  );
  return (
    <ListContainer>
      {menuItems}
    </ListContainer>
  );
};

export default menu;
