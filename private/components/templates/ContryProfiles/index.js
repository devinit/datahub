import React from 'react';
import glamorous from 'glamorous';
import {Container, Header, Grid, Icon, Button} from 'semantic-ui-react';
import {red} from 'components/theme/semantic';
import Generic from '../Generic';
import SearchInput from '../../molecules/SearchInput';


export default () => {
  const cardStyles = {
    background: 'rgba(255,255,255,.6)',
    boxShadow: '0 1px 4px rgba(0,0,0,.1)',
    paddingLeft: '1.5em',
    paddingRight: '1.5em',
    paddingBottom: '1.5em',
    paddingTop: '1.5em',
    overflow: 'visible',
    marginBottom: '4em',
  };
  const CardContainer = glamorous.div(cardStyles);
  const SocialIconsContainer = glamorous.div({
    marginTop: '1.5em',
  });
  const JumpToResource = glamorous.span({
    marginTop: '1.5em',
    display: 'block',
    '& a': {
      color: red,
    }

  });
  return (
    <Generic pathName="/aid">
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
                <SearchInput
                  visible
                  countries={[{name: 'Uganda', id: 1}, {name: 'Kenya', id: 2}, {name: 'Tanzania', id: 3}]}
                  placeholder="Type Your Country Name"
                />
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
    </Generic>
  );
};
