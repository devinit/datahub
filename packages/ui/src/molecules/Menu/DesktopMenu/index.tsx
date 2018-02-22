import glamorous from 'glamorous';
import { white } from '../../../theme/semantic';
import {mediaQueries} from '../../../theme';
import {DesktopMenuItem} from '../../../atoms/Menue';
import * as React from 'react';

const ListContainer = glamorous.ul({
  flexDirection: 'column',
  color: white,
  alignSelf: 'flex-end',
  listStyleType: 'none',
  float: 'right',
  paddingTop: '0.2em',
  margin: '0',
  [mediaQueries.phone]: {
    display: 'none',
  },
});
export interface Props {
  menu: Array<{name: string; }>;
}

const menu = (props: Props) => {
  const menuItems = props.menu.map(item => <DesktopMenuItem key={item.name} menu={item} />);
  return (
    <ListContainer>
      {menuItems}
    </ListContainer>
  );
};

export default menu;