// @flow
import * as React from 'react';
import { Element } from 'react';
import glamorous from 'glamorous';
import { Icon } from 'semantic-ui-react';

interface Props  {
  visible: boolean;
  closeHandler?: (event: any) => void;
  bottom?: string;
  top?: string;
  children: Element<any>;
}

const CloseIcon = glamorous.a({
  position: 'absolute',
  right: '20px',
  top: '20px',
  zIndex: 100,
  color: '#fff',
  fontSize: '1.5em',
});
const Overlay = glamorous.div(
  {
    position: 'absolute',
    fontWeight: 'normal',
    left: '20px',
    right: '20px',
    zIndex: 200,
    background: 'rgba(0,0,0,.65)',
    border: '1px solid #000',
    borderRadius: '5px',
    maxHeight: '740px',
    color: '#fff',
    lineHeight: 1.5
  },
  props => ({
    display: props.visible ? 'block' : 'none',
    bottom: props.bottom || '0px',
    top: props.top || '-10%',
  }),
);
const Container = glamorous.div({
  padding: '0 20px',
  fontSize: '1.1em',
});

const TourContainer = (props: Props) =>
  (<Overlay visible={props.visible} bottom={props.bottom} top={props.top}>
    <Container>
      <CloseIcon>
        <Icon
          name="close"
          onClick={event => (props.closeHandler ? props.closeHandler(event) : false)}
        />
      </CloseIcon>
      {props.children}
    </Container>
  </Overlay>);
export default TourContainer;
