// @flow
import * as React from 'react';
import { LightBg } from '../../atoms/Backgrounds';
import glamorous, { Div } from 'glamorous';
import ChartShare from '../ChartShare';
import {StateToShare} from '../ChartShare';
import { Icon, Grid } from 'semantic-ui-react';

const SocialIcon = glamorous.a({
  fontSize: '1.5em',
  fontWeight: 'bold',
  width: '2em',
  display: 'inline-block'
});
interface Props  {
  stateToShare?: StateToShare;
}
const SocialMediaBar = (props?: Props) => (
  <LightBg>
    <Grid centered columns={16}>
      <Grid.Row centered >
        <Grid.Column width={2}>
          {process.browser ?
            <div>
              <SocialIcon
                href={`https://twitter.com/intent/tweet?text=${window.location.href}&source=webclient"`}
              >
                <Icon name="twitter" />
              </SocialIcon>
              <SocialIcon href={`http://www.facebook.com/share.php?u=${window.location.href}`}>
                <Icon name="facebook f" link />
              </SocialIcon>
              <SocialIcon
                href={`mailto:?subject=Development Initiatives: Uganda&body=Development Initiatives: Uganda — ${window.location.href}`}
              >
                <Icon name="mail outline" />
              </SocialIcon>
            </div> : ''
          }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3}>
          <Div paddingLeft="1em">
            <ChartShare
              label="share this chart view"
              className="no-background"
              size="medium"
              fontSize="1.1em"
              fontWeight="500"
              iconName="linkify"
              color="grey"
              stateToShare={props && props.stateToShare ? props.stateToShare : {}}
            />
          </Div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </LightBg>
);

export default SocialMediaBar;
