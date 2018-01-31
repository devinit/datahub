import * as React from 'react';
import glamorous from 'glamorous';
import { Icon } from 'semantic-ui-react';

const TourPointer = glamorous.span({
  'position': 'absolute',
  'left': '50%',
  'marginLeft': '-2px',
  'width': '4px',
  'height': '50px',
  'background': '#fff',
  '& i': {
    position: 'absolute',
    top: '100%',
    left: '-7px',
    marginTop: '-10px',
  }
}, (props) => ({
  '& i': {
    top: props.top ? 'auto' : '100%',
  },
  bottom: props.top ? '100%' : false,
  top: props.top ? false : '100%',
}));
const TourItems = glamorous.ul({
  'padding': '0',
  'margin': '0',
  '& li': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'absolute',
  },
  '& .item-1': {
    top: '270px',
    left: '50%',
    marginLeft: '-200px',
  },
  '& .item-2': {
    top: '70px',
    right: '50%',
    marginRight: '-230px'
  },
  '& .item-3': {
    right: '50%',
    top: '40px',
    marginRight: '-400px'
  },
  '& .item-4': {
    top: '140px',
    left: '50%',
    marginLeft: '-320px'
  },
  '& .item-5': {
    top: '300px',
    right: '50%',
    marginRight: '-420px'
  },
  '& .item-6': {
    top: '320px',
    left: '50%',
    marginLeft: '-450px'
  },
  '& .item-7': {
    left: '50%',
    top: '320px',
    marginLeft: '-620px',
  },
  '& .item-8': {
    bottom: '10px',
    left: '50%',
    width: '350px',
    marginLeft: '-150px'
  },
  '& .text-right': {
    textAlign: 'right',
  },
  '& .text-center': {
    textAlign: 'center',
  },
});
const GovernmentFinanceTour = () =>
  (<TourItems>
    <li className="item-1">
      <b>How to read this visualistion</b><br />
      The main visualisation shows the hierarchy of<br />
      revenue and grants, and financing. Cells to<br />
      the left hand side represent the highest level<br />
      components– as you continue to the right, the<br />
      visualisation shows how each of these is<br />
      disaggregated into its constituent parts
    </li>
    <li className="item-2">
      Click here to share the chart you’ve created <Icon name="arrow right" />
    </li>
    <li className="item-3 text-center">
      Click here to print<br />
      <Icon name="arrow down" />
    </li>
    <li className="item-4 text-center">
      <Icon name="arrow left" />
      This sentence shows how you’ve drilled down into the main<br />
      visualisation: higher levels can be selected to go back
    </li>
    <li className="item-5 text-center">
      Click through the<br />
      cells in to drill down<br />
      into the lower levels<br />
      of the hierarchy
    </li>
    <li className="item-6 text-center">
      <TourPointer className="tour-item-pointer" top>
        <Icon name="arrow up" />
      </TourPointer>
      Drag the time<br />
      slider to change<br />
      years
      <TourPointer className="tour-item-pointer">
        <Icon name="arrow down" />
      </TourPointer>
    </li>
    <li className="item-7 text-right">
      <Icon name="arrow up" /><br />
      The line graphs<br />
      show trends in<br />
      revenue, grants<br />
      and financing<br />
      and will respond<br />
      as you drill down<br />
      into the main<br />
      visualisation<br />
      <Icon name="arrow down" /><br />
    </li>
    <li className="item-8 text-center">
      Scroll down to see expenditure<br />
      <Icon name="arrow down" />
    </li>
  </TourItems>);

export default GovernmentFinanceTour;
