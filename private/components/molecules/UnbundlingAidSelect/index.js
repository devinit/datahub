// @flow
import React from 'react';
import glamorous from 'glamorous';
import DropDown from 'components/atoms/UnbudlingAidDropDown';

type Props = {
  active?: boolean,
  smallText?: string,
  bigText: string,
  options: Array<Object>,
};
const Wrapper = glamorous.span({
  position: 'relative',
  display: '-webkit-inline-box',
  paddingLeft: '.2em',
});

const TextWrapper = glamorous.span({
}, (props) => ({
  opacity: props.active ? '1' : '.5'
}));

const BoldText = glamorous.span({
  cursor: 'pointer',
  textDecoration: 'underline',
  fontWeight: '900',
  paddingLeft: '.15em'
});
const SmallText = glamorous.span({
  cursor: 'pointer',
  fontSize: '.55em',
  paddingLeft: '.15em'
});

class Select extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      bigText: props.bigText,
    };
  }
  state: {
    visible?: boolean,
    bigText: string
  }
  setText(text: string) {
    this.setState({bigText: text});
  }
  toggleDropDown() {
    if (this.state.visible) {
      this.setState({visible: false});
    } else {
      this.setState({visible: true});
    }
  }
  render() {
    return (<Wrapper >
      <TextWrapper active={this.props.active} onClick={() => this.toggleDropDown()}>
        <SmallText>{this.props.smallText}</SmallText>
        <BoldText>{this.state.bigText}</BoldText>
      </TextWrapper>
      <DropDown
        onChange={text => this.setText(text)}
        active={this.props.active}
        onClose={() => this.toggleDropDown()}
        visible={this.state.visible}
        text={this.props.smallText || 'Select Year'}
        items={this.props.options}
      />
    </Wrapper>);
  }
}

export default Select;
