import * as React from 'react';
import glamorous, { GlamorousComponent } from 'glamorous';
import { Ceiling, Floor, Input, Pointer, Slider } from '../../atoms/YearSlider';

export const PointerContainer: GlamorousComponent<{}, any> = glamorous.div({
  width: '100%',
  left: '0.5em',
  position: 'relative'
});

export interface YearSliderProps {
  minimum: number;
  maximum: number;
  step: number;
  position: number;
  backgroundColor?: string;
  onChange: (year: number) => void;
}

export interface State {
  showInput: boolean;
  position: number;
}

class YearSlider extends React.Component<YearSliderProps> {
  state: State;

  constructor(props: YearSliderProps) {
    super(props);

    this.state = {
      showInput: false,
      position: props.position
    };
  }

  render() {
    const { maximum, minimum } = this.props;

    return (
      <Slider backgroundColor={ this.props.backgroundColor }>
        <Floor className="bubble">{ this.props.minimum }</Floor>
        <PointerContainer>
          <Pointer left={ (this.state.position - minimum) / (maximum - minimum) }>
            { Math.floor(this.state.position) }
          </Pointer>
        </PointerContainer>
        <Input
          type="range"
          className="input low"
          data-cy="Range__Input"
          step={ this.props.step }
          min={ this.props.minimum }
          max={ this.props.maximum }
          value={ this.state.position }
          onChange={ this.onSliderChange }
        />
        <Ceiling className="bubble">
          { this.props.maximum }
        </Ceiling>
      </Slider>
    );
  }

  componentWillReceiveProps(nextProps: YearSliderProps) {
    if (nextProps !== this.props) { this.setState({ position: nextProps.position }); }
  }

  onSliderChange = (event: any) => {
    const position: number = parseInt(event.target.value, 0);
    this.props.onChange(position);
    this.setState({ position });
  }
}

export default YearSlider;
