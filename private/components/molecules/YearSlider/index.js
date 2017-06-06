import React from 'react';
import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';

const Slider = glamorous.div({
  display: 'inline-block',
  position: 'relative',
  height: '14px',
  width: '100%',
  margin: '25px 5px',
  verticalAlign: 'middle',
  cursor: 'pointer',
  backgroundColor: '#ddd',
  '& .bubble': {
    cursor: 'default',
    top: '-26px',
    padding: '1px 3px',
    fontSize: '.9em',
    color: '#b8b1b6',
  }
});
const Input = glamorous.input({
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 2,
  margin: '0px',
  padding: '0px',
  opacity: '0',
  height: '100%',
  left: '0px',
  width: '100%',
  cursor: 'pointer',
});

const Pointer = glamorous.span({
  position: 'absolute',
  cursor: 'pointer',
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  border: '1px solid #666',
  top: '-10px',
  color: '#ffffff',
  paddingTop: '8px',
  textAlign: 'center',
  backgroundColor: '#e8443a',
  zIndex: 1 },
  (props) => ({
    left: `${props.left}%`,
  }));

const Floor = glamorous.span({
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 1,
  left: '0px',
  opacity: 1,
});

const Ceiling = glamorous.span({
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 1,
  right: '0px',
  opacity: 1,
});


class YearSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      position: 98,
    };
  }

  onSliderChange = (e) => {
    const position = parseInt(e.target.value, 0) - 2;
    this.setState({position});
  }

  render() {
    return (<Slider>
      <Floor
        className="bubble"
      >
        1
      </Floor>
      <Pointer
        left={this.state.position}
      >
        {this.state.position + 2}
      </Pointer>
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
