import * as React from 'react';
import { H4 } from 'glamorous';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { red } from '@devinit/dh-ui/lib/theme/semantic';
import ProfileSocialMedia from '@devinit/dh-ui/lib/molecules/ProfileSocialMedia';
import { CardContainer } from '@devinit/dh-ui/lib/atoms/Container';
import {ProfileSearch} from '@devinit/dh-ui/lib/molecules/SearchInput';
import Link from 'next/link';
import {IProcess} from '@devinit/dh-base/lib/types';
import Router from 'next/router';
import Link from 'next/link';
import Generic from '../Generic';

declare var process: IProcess;

export default () =>
  (<Generic pathname="/country-profiles">
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <CardContainer>
              <H4 color={red}>
                <Icon name="globe" color={'red'} />
                <Link href="/">
                  <a role="link" style={{color: red}}>Global Picture</a>
                </Link>
              </H4>
              <ProfileSearch profile={false} router={Router} nextLink={Link}  />
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
