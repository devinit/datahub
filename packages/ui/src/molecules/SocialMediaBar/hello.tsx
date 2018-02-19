import * as React from 'react';
import { Div } from 'glamorous';
// import glamorous, { Div } from 'glamorous';
import { LightBg } from '../../atoms/Backgrounds';
// import ChartShare from '../ChartShare';
// import { Icon } from 'semantic-ui-react';

// const SocialIcon = glamorous.a({
//   fontSize: '1.5em',
//   fontWeight: 'bold',
//   width: '2em',
//   display: 'inline-block'
// });

const SocialMediaBar = () =>
  <LightBg>
    {
    (process as any).browser ?
      <Div paddingLeft="1em">
        <p>Social media component in browser</p>
      </Div>
      : <p>Not in browser</p>
    }
    {/* <ChartShare size="big" color="black" />, */}
  </LightBg>;

export default SocialMediaBar;
