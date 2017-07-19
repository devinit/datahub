// @flow
import React from 'react';
import type {Element} from 'react';
import glamorous from 'glamorous';
import {Icon} from 'semantic-ui-react';

type Props = {
  visible: boolean,
  children: Element<any>,
}
type State = {
  visible: boolean,
}
const CloseIcon = glamorous.a({
  position: 'absolute',
  right: '20px',
  top: '20px',
  zIndex: '100',
  color: '#fff',
  fontSize: '1.5em'
});
const Overlay = glamorous.div({
  position: 'absolute',
  top: '20px',
  left: '20px',
  right: '20px',
  bottom: '0',
  zIndex: '200',
  background: 'rgba(0,0,0,.65)',
  border: '1px solid #000',
  borderRadius: '5px',
  color: '#fff'
});
const Container = glamorous.div({
  padding: '0 20px',
  fontSize: '1.1em'
});

class TourContainer extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }
  state: State;

  render() {
    return (
      <Overlay>
        <Container>
          <CloseIcon>
            <Icon name="close" />
          </CloseIcon>
          {this.props.children}
        </Container>
      </Overlay>
    );
  }
}
export default TourContainer;
