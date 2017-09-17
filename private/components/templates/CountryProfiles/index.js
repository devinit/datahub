// @flow
import React from 'react';
import glamorous, { H4 } from 'glamorous';
import { Container, Grid, Icon, Button } from 'semantic-ui-react';
import { red } from 'components/theme/semantic';
import { CardContainer } from 'components/atoms/Container';
import SearchInput from 'components/organisms/CountrySearchInput';
import Generic from '../Generic';

const SocialIconsContainer = glamorous.div({
  marginTop: '1.5em',
});
export default () =>
  (<Generic pathname="/country-profiles">
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <CardContainer>
              <H4 color={red}>
                <Icon name="globe" color={'red'} />General Picture
              </H4>
              <SearchInput visible profile={false} />
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
