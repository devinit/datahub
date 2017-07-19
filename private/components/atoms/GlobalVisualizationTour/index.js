import React from 'react';
import glamorous from 'glamorous';

const TourItems = glamorous.ul({
  padding: '0',
  margin: '0',
  '& li': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'absolute'
  },
  '& .item-1': {
    top: '10px',
    left: '10px'
  },
  '& .item-2': {
    top: '100px',
    left: '50px'
  },
  '& .item-3': {
    top: '60px',
    left: '50%',
    marginLeft: '420px',
  },
  '& .item-4': {
    top: '110px',
    left: '50%',
    marginLeft: '-270px',
  },
  '& .item-5': {
    top: '110px',
    left: '50%',
    marginLeft: '15px',
  },
  '& .item-6': {
    top: '200px',
    right: '60px',
  },
  '& .item-7': {
    top: '350px',
    left: '50%',
  },
  '& .item-8': {
    top: '400px',
    left: '50%',
  },
  '& .item-9': {
    bottom: 0,
    left: '50%',
    width: '300px',
    marginLeft: '-150px',
    textAlign: 'center',
  },
  '& .item-10': {
    bottom: 0,
    right: '5%',
    textAlign: 'center',
  },
});
const VisualizationTour = () => (
      <TourItems>
        <li className="item-1">
          Compare the colour<br />
          of each country<br />
          with the legend
          <span className="tour-item-pointer"><i className="ss-down" /></span>
        </li>
        <li className="item-2">
          As you change theme and<br />
          indicator the colour of each<br />
          country will adapt to that<br />
          indicator
        </li>
        <li className="item-3"><i className="ss-left" /> Change theme</li>
        <li className="item-4">Change indicator <i className="ss-right" /></li>
        <li className="item-5"><i className="ss-left" /> Find source information</li>
        <li className="item-6">Zoom in and out <i className="ss-upright" /></li>
        <li className="item-7">Hover over a country<br />to see data snapshot</li>
        <li className="item-8">Click a country to go<br />to country profile</li>
        <li className="item-9">Scroll down to see country rankings<br /><i className="ss-down" /></li>
        <li className="item-10">Click Share this chart view below to<br />
          to share the chart youve created<br />
          <i className="ss-down" />
        </li>
      </TourItems>
);

export default VisualizationTour;
