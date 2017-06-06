import React from 'react';
import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';


class YearSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
    };
  }


  render() {
    return (<div>
      <input
        type="range"
        className="input low"
        step="1"
        min="1990"
        max="2013"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>);
  }
}

export default YearSlider;

// <div slider="" ng-model="model.year" ng-disabled="isSliderDisabled" floor="1990" ceiling="2013" step-width="1"
//      precision="0" translate-fn="formatValue(value)"
//      class="slider ng-untouched ng-valid ng-isolate-scope ng-dirty ng-valid-parse">
//   <span
//     class="bar full"
//     style="white-space: nowrap; position: absolute; display: block; z-index: 1; left: 0px; right: 0px;">
//   </span>
//   <span
//     class="bar steps" style="white-space: nowrap; position: absolute; display: block; z-index: 1;"></span>
//   <span
//     class="pointer low"
//     style="white-space: nowrap; position: absolute; display: block; z-index: 1; left: 315px;"></span>
//   <span
//   class="bubble low ng-binding" ng-bind-template="2013"
//   style="white-space: nowrap; position: absolute; display: block; z-index: 1; left: 315px;">2013</span><span
//   class="bubble limit floor ng-binding" ng-bind-template="1990"
//   style="white-space: nowrap; position: absolute; display: block; z-index: 1; left: 0px; opacity: 1;">1990</span><span
//   class="bubble limit ceiling ng-binding" ng-bind-template="2013"
//   style="white-space: nowrap; position: absolute; display: block; z-index: 1; left: 317px; opacity: 0;">2013</span>
//   <input
//
//     style="white-space: nowrap; position: absolute; display: block; z-index: 1; margin: 0px; padding: 0px; opacity: 0; height: 100%; left: 0px; width: 100%;"/>
// </div>
