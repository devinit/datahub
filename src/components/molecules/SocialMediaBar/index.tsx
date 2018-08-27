import glamorous from 'glamorous';
import * as React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { LightBg } from '../../atoms/Container';
import { Intro } from '../../atoms/Intro';
import ChartShare, { StateToShare } from '../ChartShare';
import { howTo } from '../../../utils/howTo';

const SocialIcon = glamorous.a({
  fontSize: '1.5em',
  fontWeight: 'bold',
  width: '2em',
  display: 'inline-block'
});

export interface Props {
  stateToShare?: StateToShare;
}

const SocialMediaBar = (props?: Props) => (
  <LightBg>
    <Grid centered columns={ 16 }>
      <Grid.Row centered >
        <Grid.Column width={ 2 }>
          { (process as any).browser ?
            <div>
              <SocialIcon
                href={ `https://twitter.com/intent/tweet?text=${window.location.href}&source=webclient"` }
              >
                <Icon name="twitter" />
              </SocialIcon>
              <SocialIcon href={ `http://www.facebook.com/share.php?u=${window.location.href}` }>
                <Icon name="facebook f" link />
              </SocialIcon>
              <SocialIcon
                href={
                  `mailto:?subject=Development Initiatives:
                    Uganda&body=Development Initiatives: Uganda — ${window.location.href}` }
              >
                <Icon name="mail" />
              </SocialIcon>
            </div> : ''
          }
        </Grid.Column>
      </Grid.Row>
      <Intro step={ 4 } intro={ howTo.unbundlingAid.share } style={ { paddingLeft: '1em' } }>
        <Grid.Row>
          <Grid.Column width={ 3 }>
              <ChartShare
                label="share this chart view"
                className="no-background"
                size="medium"
                fontSize="1.1em"
                fontWeight="500"
                iconName="linkify"
                color="grey"
                stateToShare={ props && props.stateToShare ? props.stateToShare : {} }
              />
          </Grid.Column>
        </Grid.Row>
      </Intro>
    </Grid>
  </LightBg>
);

export default SocialMediaBar;
