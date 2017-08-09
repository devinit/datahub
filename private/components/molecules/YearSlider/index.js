// @flow
import React from 'react';
import glamorous from 'glamorous';
import {
  Slider,
  Floor,
  Ceiling,
  Input,
  Pointer
} from '../../atoms/YearSlider';

export const PointerContainer = glamorous.div({
  width: '100%',
  left: '0.5em',
  position: 'relative'
});

type Props = {
  minimum: number,
  maximum: number,
  step: number,
  position: number,
  onChange(year: number): void
}

type State = {
  showInput: boolean,
  position: number,
}

class YearSlider extends React.Component {

  // eslint-disable-next-line
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      showInput: false,
      position: props.position,
    };
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) this.setState({position: nextProps.position});
  }
  onSliderChange = (e: any) => {
    const position = parseInt(e.target.value, 0);
    this.props.onChange(position);
    this.setState({position});
  };

  render() {
    return (<Slider>
      <Floor className="bubble">{this.props.minimum}</Floor>
      <PointerContainer>
        <Pointer
          left={
            (this.state.position - this.props.minimum) /
            (this.props.maximum - this.props.minimum)}
        >
          {Math.floor(this.state.position)}
        </Pointer>
      </PointerContainer>
      <Input
        type="range"
        className="input low"
        step={this.props.step}
        min={this.props.minimum}
        max={this.props.maximum}
        value={this.state.position}
        onChange={this.onSliderChange}
      />
      <Ceiling className="bubble">{this.props.maximum}</Ceiling>
    </Slider>);
  }
}

export default YearSlider;
