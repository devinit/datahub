import React from 'react';
import glamorous from 'glamorous';

const Overlay = glamorous.div({
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
});
const VisualizationTour = () => (
  <Overlay>
    <Container>
      <TourItems>
        <li className="tour-item-1">
          Compare the colour<br />
          of each country<br />
          with the legend
          <span className="tour-item-pointer"><i className="ss-down" /></span>
        </li>
        <li className="tour-item-2">
          As you change theme and<br />
          indicator the colour of each<br />
          country will adapt to that<br />
          indicator
        </li>
        <li className="tour-item-3"><i className="ss-left" /> Change theme</li>
        <li className="tour-item-4">Change indicator <i className="ss-right" /></li>
        <li className="tour-item-5"><i className="ss-left" /> Find source information</li>
        <li className="tour-item-6">Zoom in and out <i className="ss-upright" /></li>
        <li className="tour-item-7">Hover over a country<br />to see data snapshot</li>
        <li className="tour-item-8">Click a country to go<br />to country profile</li>
        <li className="tour-item-9">Scroll down to see country rankings<br /><i className="ss-down" /></li>
        <li className="tour-item-10">Click Share this chart view below to<br />
          to share the chart youve created<br />
          <i className="ss-down" />
        </li>
      </TourItems>
    </Container>
  </Overlay>
);

export default VisualizationTour;
