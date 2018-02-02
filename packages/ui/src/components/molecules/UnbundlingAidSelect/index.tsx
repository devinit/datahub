// @flow
import * as React from 'react';
import glamorous from 'glamorous';
import DropDown from '../../atoms/UnbudlingAidDropDown';

interface Props  {
  options: object[];
  active?: boolean;
  smallText?: string;
  value: string;
  onChange(value: string): void;
}

const Wrapper = glamorous.span({
  position: 'relative',
  paddingLeft: '.2em',
});

const TextWrapper = glamorous.span({}, props => ({
  opacity: props.active ? 1 : .5,
}));

const BoldText = glamorous.span({
  cursor: 'pointer',
  textDecoration: 'underline',
  fontWeight: 900,
  paddingLeft: '.15em',
});
const SmallText = glamorous.span({
  cursor: 'pointer',
  fontSize: '.55em',
  paddingLeft: '.15em',
});

class Select extends React.Component {
  public state: {
    visible?: boolean,
    bigText: string,
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      bigText: this.props.value,
    };
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (this.props !== nextProps) {
      const item = nextProps.options.find(obj => obj.key === nextProps.value);
      this.setState({ bigText: item ? item.name : nextProps.value, visible: false });
    }
  }

  public onChanged(selected: object) {
    this.setState({ bigText: selected.name, visible: false });
    this.props.onChange(selected.value);
  }

  public toggleDropDown() {
    if (this.state.visible) {
      this.setState({ visible: false });
    } else {
      this.setState({ visible: true });
    }
  }

  public render() {
    return (
      <Wrapper>
        <TextWrapper active={this.props.active} onClick={() => this.toggleDropDown()}>
          <SmallText>
            {this.props.smallText}
          </SmallText>
          <BoldText>
            {this.state.bigText}
          </BoldText>
        </TextWrapper>
        <DropDown
          onChange={selected => this.onChanged && this.onChanged(selected)}
          active={this.props.active}
          onClose={() => this.toggleDropDown()}
          visible={this.state.visible}
          text={this.props.smallText || ''}
          items={this.props.options}
        />
      </Wrapper>
    );
  }
}

export default Select;
