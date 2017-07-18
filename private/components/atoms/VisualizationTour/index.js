import React from 'react';
import glamorous from 'glamorous';

const overlay = glamorous.div({
  position: 'absolute',
  top: '-50px',
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
const TourItems = glamorous.ul({
    padding: '0',
    margin: '0'
})
const VisualizationTour = () => (
  <Overlay>
    <Container>
    </Container>
  </Overlay>
);

export default VisualizationTour;
