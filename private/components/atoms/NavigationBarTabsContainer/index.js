// @flow
import glamorous, {Div} from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import TabHeader from 'components/atoms/NavigationBarTabsHeader';
import type {Props as Selectprops} from 'components/atoms/NavigationBarTabsSelect';
import Select from 'components/atoms/NavigationBarTabsSelect';


const DarkTabsContainer = (props: Selectprops) => (
  <Div paddingBottom={'5em'}>
    <TabHeader>
      <Container textAlign="center">
        <Select {...props} />
      </Container>
    </TabHeader>
  </Div>
);

export default DarkTabsContainer;
