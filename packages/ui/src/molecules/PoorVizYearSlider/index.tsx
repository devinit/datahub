// @flow
import * as React from 'react';
import DragdealerContainer from 'components/atoms/DragDealer';
import Dragdealer from 'dragdealer';

interface Props  {
  onYearChange: (year: number) => void;
}

interface State  {
  year: number;
}

class YearSlider extends React.Component {
  public state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      year: 2013,
    };
  }

  public componentDidMount() {
    const firstYear = 1990;
    const lastYear = 2030;
    const year = 2013;
    const yearSpan = lastYear - firstYear;
    const realPos = year - firstYear;
    const realOfAll = realPos / yearSpan;
    /* eslint-disable no-new */
    new Dragdealer('year-slider', {
      x: realOfAll, // Set selected position
      snap: true,
      steps: yearSpan + 1, // Number of steps
      left: 0,
      right: 0,
      animationCallback: (x) => {
        const currentYear = firstYear + (x * yearSpan);
        this.setState({year: currentYear});
        this.props.onYearChange(currentYear);
      }
    });
  }
  public render() {
    return (
      <DragdealerContainer>
        <div id="year-slider" className="dragdealer">
          <div className="handle red-bar">
            {this.state.year}
          </div>
        </div>
      </DragdealerContainer>
    );
  }
}

export default YearSlider;
