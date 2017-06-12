import React from 'react';
import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
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

class YearSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      position: 100,
    };
  }

  onSliderChange = (e) => {
    const position = parseInt(e.target.value, 0);
    this.setState({position});
  }

  render() {
    return (<Slider>
      <Floor
        className="bubble"
      >
        1
      </Floor>
      <PointerContainer>
        <Pointer
          left={this.state.position}
        >
          {this.state.position}
        </Pointer>
      </PointerContainer>
      <Input
        type="range"
        className="input low"
        step="1"
        min="1"
        max="100"
        value="100"
        onChange={this.onSliderChange}
      />
      <Ceiling
        className="bubble"
      >
        100
      </Ceiling>
    </Slider>);
  }
}

export default YearSlider;
