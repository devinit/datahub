// @flow
import React from 'react';
import glamorous from 'glamorous';
import { Icon } from 'semantic-ui-react';

const TourPointer = glamorous.span({
  position: 'absolute',
  left: '50%',
  marginLeft: '-2px',
  width: '4px',
  background: '#fff',
  '& i': {
    position: 'absolute',
    top: '100%',
    left: '-7px',
    marginTop: '-10px',
  },
});
const TourItems = glamorous.ul({
  padding: '0',
  margin: '0',
  '& li': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'absolute',
  },
  '& .item-1': {
    top: '10px',
    left: '10px',
    '& .tour-item-pointer': {
      height: '470px',
      top: '100%',
      left: '10px',
    },
  },
  '& .item-2': {
    top: '100px',
    left: '50px',
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
    bottom: '10px',
    left: '50%',
    width: '300px',
    marginLeft: '-150px',
    textAlign: 'center',
  },
  '& .item-10': {
    bottom: '10px',
    right: '5%',
    textAlign: 'center',
  },
});

type Props = {
  entity: string
}

const VisualizationTour = (props: Props) =>
  (<TourItems>
    <li className="item-1">
      Compare the colour<br />
      of each {props.entity}<br />
      with the legend
      <TourPointer className="tour-item-pointer">
        <Icon name="arrow down" />
      </TourPointer>
    </li>
    <li className="item-2">
      As you change theme and<br />
      indicator the colour of each<br />
      {props.entity} will adapt to that<br />
      indicator
    </li>
    <li className="item-3">
      <Icon name="arrow left" /> Change theme
    </li>
    <li className="item-4">
      Change indicator <Icon name="arrow right" />
    </li>
    <li className="item-5">
      <Icon name="arrow left" /> Find source information
    </li>
    <li className="item-6">
      Zoom in and out <Icon name="arrow up" />
    </li>
    <li className="item-7">
      Hover over a {props.entity}<br />to see data snapshot
    </li>
    <li className="item-8">
      Click a {props.entity} to go<br />to {props.entity} profile
    </li>
    <li className="item-9">
      Scroll down to see {props.entity} rankings<br />
      <Icon name="arrow down" />
    </li>
    <li className="item-10">
      Click Share this chart view below to<br />
      to share the chart youve created<br />
      <Icon name="arrow down" />
    </li>
  </TourItems>);

export default VisualizationTour;
