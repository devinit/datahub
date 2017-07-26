import React from 'react';
import glamorous from 'glamorous';
import { Container, Header, Grid, Icon, Button } from 'semantic-ui-react';
import { red } from 'components/theme/semantic';
import {CardContainer} from 'components/atoms/Container';
import SearchInput from 'components/organisms/CountrySearchInput';
import Generic from '../Generic';


const SocialIconsContainer = glamorous.div({
  marginTop: '1.5em'
});

const JumpToResource = glamorous.span({
  marginTop: '1.5em',
  display: 'block',
  '& a': {
    color: red
  }
});

export default () =>
  (<Generic>
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <CardContainer>
              <Header>
                <Icon name="globe" />
                <Header.Content>
                  General Picture
                </Header.Content>
              </Header>
              <SearchInput visible />
              <JumpToResource>
                Jump to <a>International resources</a>
              </JumpToResource>
              <SocialIconsContainer>
                <Button icon="facebook f" />
                <Button icon="twitter" />
                <Button icon="google plus" />
                <Button icon="mail outline" />
              </SocialIconsContainer>
            </CardContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Generic>);
