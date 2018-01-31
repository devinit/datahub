// @flow
import React, {Component} from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { white, black, lightSecondaryColor} from '../../theme/semantic';
import {getShortURL} from 'lib/utils';
import glamorous, { Div, Span } from 'glamorous';

export const NoBackground = {
  '& .no-background:hover': {
    boxShadow: '0 1px 6px rgba(0,0,0,.3)'
  },
  '& .no-background': {
    backgroundColor: 'transparent !important',
    color: `${lightSecondaryColor} !important`,
  }
};

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
  ...NoBackground,
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
  year?: number,
  budgetType?: string,
  currency?: string,
  chartId?: string,
  indicator?: string
}
type Props = {
  size: string,
  color: string,
  iconName?: string,
  fontWeight?: string | number,
  fontSize?: string,
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
    value: 2
  }
  state: State
  componentDidMount() {
    this.createLink(this.props);
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps !== this.props) this.createLink(nextProps);
  }
  onLinkChange = () => this.createLink(this.props);

  handleChange = (value: number) => {
    this.setState({value});
    this.createLink(this.props, value);
  };
  // checkedoption i.e 1 is default 2 is as configured
  async createLink(props: Props, checkedOption?: number = 2) {
    if (!props.stateToShare) return this.state;
    const currentUrl = window.location.href;
    const chartState =
      checkedOption === 1 && props.stateToShare ?
        {...props.stateToShare, year: null} : props.stateToShare;
    const link = `${currentUrl}?state=${JSON.stringify(chartState)}`;
    const shortURL: string = link.includes('localhost') ? link : await getShortURL(link);
    return this.setState({link: shortURL});
  }
  render() {
    const {className, size, color, label, background,
      hover, fontSize, iconName, fontWeight} = this.props;
    return (
      <Modal
        trigger={
          <ButtonWrapper background={background} hover={hover}>
            <Button
              className={className}
              size={size}
              color={color}
            >
              <Icon name={iconName || 'share alternate'} />
              <Span
                fontWeight={fontWeight || 'normal'}
                fontSize={fontSize || '0.85em'}
              >
                {label || 'Share this chart'}</Span>
            </Button>
          </ButtonWrapper>
        }
        size="tiny"
        closeIcon="close"
      >
        <Modal.Content>
          <Modal.Description>
            <Container>
              <h4>Share this visualisation</h4>
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
                <a href={`http://www.facebook.com/share.php?u=${this.state.link}`}>
                  <Button icon="facebook f" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${this.state.link}&source=webclient"`}
                >
                  <Button icon="twitter" />
                </a>
                <a
                  href={`mailto:?subject=Development Initiatives: Uganda&body=Development Initiatives: Uganda — ${this.state.link}`}
                >
                  <Button icon="mail outline" />
                </a>
              </Div>
            </Container>
          </Modal.Description>
        </Modal.Content>
      </Modal>);
  }
}
