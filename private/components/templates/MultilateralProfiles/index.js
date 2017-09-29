// @flow
import React from 'react';
import glamorous, { H4 } from 'glamorous';
import { Container, Grid, Icon, List } from 'semantic-ui-react';
import ProfileSocialMedia from 'components/molecules/ProfileSocialMedia';
import { red } from 'components/theme/semantic';
import { CardContainer } from 'components/atoms/Container';
import Link from 'next/link';
import Generic from '../Generic';

const multilaterals = [
  {name: 'World Bank Group', id: 'ida'},
  {name: 'EU Institutions', id: 'EU'},
  {name: 'African Development Bank and Fund', id: 'afdb'},
  {name: 'Asian Development Bank', id: 'asdb'},
  {name: 'United Nations Development Programme', id: 'undp'}
];

const ListWrapper = glamorous.div({
  paddingLeft: '2em',
  '& a': {lineHeight: 2 }
});

export default () =>
  (<Generic pathname="/multilaterals">
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <CardContainer>
              <H4 color={red}>
                <Icon name="globe" color={'red'} />
                <a href="/multilaterals" style={{color: red}}>Multilateral Profiles</a>
              </H4>
              <ListWrapper>
                <List size="large">
                  {
                    multilaterals.map(obj =>
                      (<List.Item>
                        <Link href={`/multilateral?id=${obj.id}`} as={`/multilateral/${obj.id}`}>
                          <a role="link">{obj.name}</a>
                        </Link>
                      </List.Item>))
                  }
                </List>
              </ListWrapper>
              {process.browser ?
                <ProfileSocialMedia />
                : ''
              }
            </CardContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Generic>);
