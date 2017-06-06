import React from 'react';
import glamorous from 'glamorous';
import {Container} from 'semantic-ui-react';
import theme from '../../theme';

const Slider = glamorous.div({
  display: 'inline-block',
  position: 'relative',
  height: '1em',
  width: '100%',
  margin: '2.5em .02em',
  verticalAlign: 'middle',
  cursor: 'pointer',
  backgroundColor: theme.lightGray,
  '& .bubble': {
    cursor: 'default',
    top: '-2em',
    padding: '0.012em 0.12em',
    fontSize: '.9em',
    color: theme.greyText,
  }
});
const Input = glamorous.input({
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 2,
  margin: '0em',
  padding: '0em',
  opacity: '0',
  height: '100%',
  left: '0em',
  width: '100%',
  cursor: 'pointer',
});

const Pointer = glamorous.span({
  position: 'absolute',
  cursor: 'pointer',
  width: '2.65em',
  height: '2.65em',
  borderRadius: '50%',
  border: '0.012em solid #666',
  top: '-0.8em',
  color: theme.plainWhite,
  paddingTop: '.6em',
  textAlign: 'center',
  backgroundColor: theme.darkRed,
  zIndex: 1 },
  (props) => ({
    left: `${props.left}%`,
  }));

const Floor = glamorous.span({
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 1,
  left: '0em',
  opacity: 1,
});

const Ceiling = glamorous.span({
  whiteSpace: 'nowrap',
  position: 'absolute',
  display: 'block',
  zIndex: 1,
  right: '0em',
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
