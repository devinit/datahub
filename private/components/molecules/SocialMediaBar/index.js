// @flow
import React from 'react';
import { LightBg } from 'components/atoms/Backgrounds';
import glamorous, {Div} from 'glamorous';
import ChartShare from 'components/molecules/ChartShare';
import { Icon, Grid } from 'semantic-ui-react';

const SocialIcon = glamorous.a({
  fontSize: '0.8em',
  width: '5em',
  display: 'inline-block'
});

const SocialMediaBar = () => (
  <LightBg>
    <Grid centered columns={16}>
      <Grid.Row centered >
        <Grid.Column width={3}>
          <SocialIcon href={`http://www.facebook.com/share.php?u=${window.location.href}`}>
            <Icon name="facebook f" link />
          </SocialIcon>
          <SocialIcon
            href={`https://twitter.com/intent/tweet?text=${window.location.href}&source=webclient"`}
          >
            <Icon name="twitter" />
          </SocialIcon>
          <SocialIcon
            href={`mailto:?subject=Development Initiatives: Uganda&body=Development Initiatives: Uganda — ${window.location.href}`}
          >
            <Icon name="mail outline" />
          </SocialIcon>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <Div paddingLeft="1em">
            <ChartShare
              label="share this chart view"
              className="no-background"
              size="medium"
              fontSize="1.1em"
              fontWeight="500"
              iconName="linkify"
              color="grey"
              stateToShare={{}}
            />
          </Div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </LightBg>
);


export default SocialMediaBar;
