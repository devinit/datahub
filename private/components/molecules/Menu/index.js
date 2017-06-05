import glamorous from 'glamorous';
import theme from 'components/theme';
import {Container, Grid} from 'semantic-ui-react';
import React from 'react';


const MenuContainer = glamorous.div({
  backgroundColor: theme.red,
  color: theme.plainWhite,
  display: 'flex',
});
const ListContainer = glamorous.ul({
  flexDirection: 'column',
  color: theme.plainWhite,
  alignSelf: 'flex-end',
});

const footer = () => (
  <MenuContainer>
    <ListContainer>
      <li><a href="">Menu 1</a></li>
      <li><a href="">Menu 1</a></li>
      <li><a href="">Menu 1</a></li>
      <li><a href="">Menu 1</a></li>
    </ListContainer>

  </MenuContainer>
);

export default footer;
