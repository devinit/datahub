// @flow
import React, {Component} from 'react';
import Dragdealer from 'dragdealer';
import stylesheet from 'dragdealer/src/dragdealer.css';
/* eslint-disable react/no-danger */
type Props = {
  onYearChange: (year: number) => void
}

type State = {
  year: number;
}

class YearSlider extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      year: 2013
    };
  }
  state: State

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
      <div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div id="year-slider" className="dragdealer">
          <div className="handle red-bar">{this.state.year}</div>
        </div>
      </div>);
  }
}

export default YearSlider;
