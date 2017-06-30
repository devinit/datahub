// @flow
import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import React from 'react';
import TabHeader from 'components/atoms/DarkTabsHeader';
import Select from 'components/atoms/DarkTabsSelect';

const PaneContainer = glamorous.div({
  paddingBottom: '5em',
});

const DarkTabsContainer = (props: Object) => (
  <PaneContainer>
    <TabHeader>
      <Container textAlign="center">
        <Select options={props.options} />
      </Container>
    </TabHeader>
    {props.children}
  </PaneContainer>
);

export default DarkTabsContainer;
