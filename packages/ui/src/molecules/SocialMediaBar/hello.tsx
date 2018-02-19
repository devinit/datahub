import * as React from 'react';
import { Div } from 'glamorous';
import { LightBg } from '../../atoms/Backgrounds';
// import ChartShare from '../ChartShare';
import { Icon } from 'semantic-ui-react';

const SocialMediaBar = () =>
    <LightBg>
         <Icon name="twitter" />
        <p>Social media component</p>
        <Div paddingLeft="1em">
            <p>In div</p>
            {/* <ChartShare
              label="share this chart view"
              className="no-background"
              size="medium"
              fontSize="1.1em"
              fontWeight="500"
              iconName="linkify"
              color="grey"
              stateToShare={{year: 2000}}
            /> */}
          </Div>
    </LightBg>;

export default SocialMediaBar;
