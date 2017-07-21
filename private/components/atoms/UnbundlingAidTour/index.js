import React from 'react';
import glamorous from 'glamorous';
import {Icon} from 'semantic-ui-react';

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
  }
});
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
    bottom: '80px',
    left: '20px'
  },
  '& .item-2': {
    width: '580px',
    height: '80px',
    top: '45px',
    left: '50%',
    marginLeft: '-320px',
    border: '2px solid #fff'
  },
  '& .item-3': {
    left: '50%',
    top: '30px',
    marginLeft: '-590px',
    '& i': {
      position: 'absolute',
      left: '100%',
      top: '50%',
      marginLeft: '10px',
      marginTop: '-10px'
    }
  },
  '& .item-4': {
    top: '10px',
    left: '50%',
    width: '580px',
    marginLeft: '-310px',
    '& .tour-item-pointer': {
      width: '200px',
      height: '4px',
      top: '100%',
      marginLeft: '-110px',
      marginTop: '50px',
      '& i.right': {
        left: '100%',
        marginLeft: '-10px',
        top: '2px'
      },
      '& i.left': {
        top: '2px',
      },
    }
  },
  '& .item-5': {
    top: '110px',
    left: '50%',
    marginLeft: '-290px',
    '& i': {
      marginTop: '-10px',
      position: 'absolute'
    }
  },
  '& .item-6': {
    top: '260px',
    left: '50%',
    marginLeft: '-200px',
    '& .tour-item-pointer': {
      height: '150px',
      width: '4px',
      bottom: '100%',
      left: '65px',
      '& i': {
        top: 'auto'
      }
    }
  },
  '& .item-7': {
    right: '60px',
    top: '100px',
  },
  '& .item-8': {
    bottom: '60px',
    left: '50%',
    width: '300px',
    marginLeft: '-150px',
  },
  '& .text-right': {
    textAlign: 'right',
  },
  '& .text-center': {
    textAlign: 'center',
  },
});
const VisualizationTour = () => (
  <TourItems>
    <li className="item-1">
      <b>How to read this<br />visualistion</b><br />
      Each cell in the tree map<br />
      is sized by the volume of<br />ODA it represents. The<br />
      total amount of ODA<br />
      being viewed at any time<br />
      is given above the top left<br />
      corner of the tree map
    </li>
    <li className="item-2 item-frame" />
    <li className="item-3 text-right">
      This sentence describes what the<br />
      tree map is showing. The<br />
      dimension in bold is the one<br />
      youre currently viewing
      <Icon name="arrow right" />
    </li>
    <li className="item-4 text-center">
      Drag and drop dimensions to view in a customised order
      <TourPointer className="tour-item-pointer">
        <Icon name="arrow left" />
        <Icon name="arrow right" />
      </TourPointer>
    </li>
    <li className="item-5 text-center">
      <Icon name="arrow up" /><br />
      Change the<br />
      year here
    </li>
    <li className="item-6">
      <TourPointer className="tour-item-pointer">
        <Icon name="arrow up" />
      </TourPointer>
      Click through the cells in the<br />
      tree map to drill down into the<br />
      details, or select a dimension<br />
      above to open a drop-down menu
    </li>
    <li className="item-7 text-right">
      <Icon name="arrow up" /><br />
      Click <b>Compare</b> to view two<br />
      tree maps side by side
    </li>
    <li className="item-8 text-center">
      Click <b>Share this chart</b> below to<br />
      share the chart you’ve created<br />
      <Icon name="arrow down" />
    </li>
  </TourItems>
);

export default VisualizationTour;
