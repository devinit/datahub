import React from 'react';
import Dragdealer from 'dragdealer';
import 'dragdealer/src/dragdealer.css';

class YearSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2013
    };
  }
  componentDidMount() {
    const firstYear = 1990;
    const lastYear = 2030;
    const year = 2013;
    const yearSpan = lastYear - firstYear;
    const realPos = year - firstYear;
    const realOfAll = realPos / yearSpan;

    const slider = new Dragdealer('year-slider', {

      x: realOfAll,  // Set selected position
      snap: true,
      steps: yearSpan + 1, // Number of steps
      left: 0,
      right: 0,
      animationCallback: (x, y) => {
        const currentYear = firstYear + (x * yearSpan);
        this.setState({year: currentYear});
        this.props.onYearChange(currentYear);
      }
    });
  }
  render() {
    return (
      <div id="year-slider" className="dragdealer">
        <div className="handle red-bar">{this.state.year}</div>
      </div>);
  }
}

export default YearSlider;
