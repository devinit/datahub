// @flow
import React from 'react';
import glamorous from 'glamorous';
import DropDown from 'components/atoms/UnbudlingAidDropDown';

type Props = {
  active: boolean,
  smallText: ?string,
  bigText: string,
  options: Array<Object>,
};
const Wrapper = glamorous.span({
  position: 'relative',
});

const TextWrapper = glamorous.span({
}, (props) => ({
  opacity: props.active ? '1' : '.8'
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
    };
  }
  state: {
    visible?: boolean
  }
  toggleDropDown() {
    if (this.state.visible) {
      this.setState({visible: false});
    } else {
      this.setState({visible: true});
    }
  }
  render() {
    return (<Wrapper>
      <TextWrapper onClick={() => this.toggleDropDown()}>
        <SmallText>{this.props.smallText}</SmallText>
        <BoldText>{this.props.bigText}</BoldText>
      </TextWrapper>
      <DropDown visible={this.state.visible} text={this.props.bigText} items={this.props.options} />
    </Wrapper>);
  }
}

export default Select;
