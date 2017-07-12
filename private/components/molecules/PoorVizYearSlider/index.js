import React from 'react';
import Dragdealer from 'dragdealer';

class YearSlider extends React.Component {
  componentDidMount() {
    const slider = new Dragdealer('year-slider');
  }
  render() {
    return (
      <div id="year-slider" className="dragdealer">
        <div className="handle red-bar">drag me</div>
      </div>);
  }
}

export default YearSlider;
