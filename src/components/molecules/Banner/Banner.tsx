import * as React from 'react';
import { css } from 'glamor';
import { Grid, Message } from 'semantic-ui-react';
import * as localforage from 'localforage';

const messageStyles = css({
  textAlign: 'center',
  marginBottom: '0 !important',
  marginTop: '1rem !important',
  backgroundColor: '#fee7c1 !important'
});
const textStyle = css({
  fontWeight: 'bold',
  paddingRight: '3rem !important'
});
const closeButtonStyles = css({
  position: 'absolute',
  top: '38px',
  right: '16px',
  cursor: 'pointer'
});

class Banner extends React.Component {
  state = { showBanner: false };

  render() {
    if (this.state.showBanner) {
      return (
        <Message warning { ...messageStyles } floating size="big">
          <Grid columns={ 2 } container stackable>
            <Grid.Row>
              <Grid.Column width={ 1 }>
                <i aria-hidden="true" className="icon warning sign big"/>
              </Grid.Column>
              <Grid.Column width={ 15 } { ...textStyle }>
                The Development Data Hub is not currently displaying the most up-to-date data,
                as it is soon to undergo redevelopment.
                If you have any data-related questions please email info@devinit.org
              </Grid.Column>
            </Grid.Row>
          <i aria-hidden="true" className="icon close" { ...closeButtonStyles } onClick={ this.onClose }/>
          </Grid>
        </Message>
      );
    }

    return null;
  }

  componentDidMount() {
    localforage.getItem('showBanner').then(showBanner => {
      if (showBanner === null) {
        this.setState({ showBanner: true });
        localforage.setItem('showBanner', true);
      } else {
        this.setState({ showBanner });
      }
    });
  }

  private onClose = () => {
    this.setState({ showBanner: false });
    localforage.setItem('showBanner', false);
  }
}

export default Banner;
