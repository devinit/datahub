// @flow
import React, {Component} from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { white, black, lightSecondaryColor} from 'components/theme/semantic';
import glamorous, { Div, Span } from 'glamorous';

const Container = glamorous.div({
  padding: '5em',
  '& input.link': {
    display: 'inline-block',
    width: '100%',
    marginTop: '2em',
    height: '3em',
    padding: '.5em 1.5em',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: black,
    backgroundColor: white,
    boxSizing: 'border-box',
    borderRadius: '.25em',
    outline: 0,
    border: `2px solid ${black}`,
  },
});
const ButtonWrapper = glamorous.span({
}, (props) => ({
  '& button:hover': {
    boxShadow: props.hover ? '0 1px 6px rgba(0,0,0,.3) !important' : false
  },
  '& button': {
    backgroundColor: props.background ? 'inherit' : 'transparent !important',
    color: props.background ? 'inherit' : `${lightSecondaryColor} !important`,
  }
}));
export type StateToShare = {
  startYear?: number,
  year?: number,
  budgetType?: string,
  currency?: string,
  chartId?: string
}
type Props = {
  size: string,
  color: string,
  backgroundColor?: string,
  label?: string,
  className?: string,
  background?: boolean,
  hover?: boolean,
  stateToShare?: StateToShare
};

type State = {
  link: string,
  value: number
}

export default class ChartShare extends Component {
  static defaultProps = {
    background: true,
    hover: false
  };
  /* eslint-disable no-useless-constructor */
  constructor(props: Props) {
    super(props);
  }
  state = {
    link: '',
    value: 1
  }
  state: State
  componentDidMount() {
    this.createLink();
  }
  onLinkChange = () => this.createLink();

  handleChange = (value: number) => this.setState({value});

  createLink() {
    if (!this.props.stateToShare) return this.state;
    const currentUrl = window.location.href;
    const link = `${currentUrl}&state=${JSON.stringify(this.props.stateToShare)}`;
    return this.setState({link});
  }
  render() {
    const {className, size, color, label, background, hover} = this.props;
    return (<Modal
      trigger={
        <ButtonWrapper background={background} hover={hover}>
          <Button
            className={className}
            size={size}
            color={color}
          >
            <Icon name="share alternate" />
            <Span fontSize={'0.85em'}>{label || 'Share this Chart'}</Span>
          </Button>
        </ButtonWrapper>
      }
      closeIcon="close"
    >
      <Modal.Content>
        <Modal.Description>
          <Container>
            <h4>Share this Visualization</h4>
            <input
              type="radio"
              value={1}
              checked={this.state.value === 1}
              onChange={() => this.handleChange(1)}
            /> in default view <br />
            <input
              type="radio"
              value={2}
              checked={this.state.value === 2}
              onChange={() => this.handleChange(2)}
            /> as I configured it<br />
            <input className="link" value={this.state.link} onChange={this.onLinkChange} />
            <Div marginTop={'1.5em'}>
              <Button icon="facebook f" />
              <Button icon="twitter" />
              <Button icon="mail outline" />
            </Div>
          </Container>
        </Modal.Description>
      </Modal.Content>
    </Modal>);
  }
}
