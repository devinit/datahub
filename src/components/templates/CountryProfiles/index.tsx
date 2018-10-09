import * as React from 'react';
import { H4 } from 'glamorous';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { red } from '../../theme/semantic';
import ProfileSocialMedia from '../../molecules/ProfileSocialMedia';
import { CardContainer } from '../../atoms/Container';
import { ProfileSearch } from '../../molecules/SearchInput';
import Link from 'next/link';
import { IProcess } from '../../types';
import Router from 'next/router';
import Generic from '../Generic';

declare var process: IProcess;

export default () => (
  <Generic>
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column computer={ 10 } mobile={ 16 } tablet={ 16 }>
            <CardContainer>
              <H4 color={ red }>
                <Icon name="globe" color={ 'red' } />
                <Link href="/">
                  <a role="link" style={ { color: red } }>Global Picture</a>
                </Link>
              </H4>
              <ProfileSearch profile={ false } router={ Router } nextLink={ Link } />
              { process.browser ? <ProfileSocialMedia /> : '' }
            </CardContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Generic>
);
