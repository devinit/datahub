import * as React from 'react';
import { Button, Icon, Modal, SemanticICONS } from 'semantic-ui-react';
import { black, lightSecondaryColor, white } from '../../theme/semantic';
import { getShortURL } from '@devinit/prelude/lib/misc';
import glamorous, { Div, Span } from 'glamorous';
import { getWarehouseAPILink } from '../../../utils';

export const NoBackground = {
  '& .no-background:hover': {
    boxShadow: '0 1px 6px rgba(0,0,0,.3)'
  },
  '& .no-background': {
    backgroundColor: 'transparent !important',
    color: `${lightSecondaryColor} !important`
  }
};

const StyledInput = glamorous.input({
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
    border: `2px solid ${black}`
});

const ButtonWrapper = glamorous.span<{hover?: boolean; background?: boolean; }>({
  ...NoBackground
}, (props) => ({
  '& button:hover': {
    boxShadow: props.hover ? '0 1px 6px rgba(0,0,0,.3) !important' : 'auto'
  },
  '& button': {
    backgroundColor: props.background ? 'inherit' : 'transparent !important',
    color: props.background ? 'inherit' : `${lightSecondaryColor} !important`
  }
}));

export interface StateToShare {
  year?: number;
  budgetType?: string;
  currency?: string;
  chartId?: string;
  indicator?: string;
}
export interface Props {
  size: any;
  color: any;
  iconName?: SemanticICONS;
  fontWeight?: any;
  fontSize?: string;
  backgroundColor?: string;
  label?: string;
  className?: string;
  background?: boolean;
  hover?: boolean;
  stateToShare?: StateToShare;
  download?: boolean;
}

export interface State {
  link: string;
  value: number;
}

export default class ChartShare extends React.Component<Props, State> {
  public static defaultProps = {
    background: true,
    hover: false
  };
  public state = {
    link: '',
    value: 2 // TODO:  why not a boolean
  };
  private noDownloadSupport = [ 'survey_p20', 'subnational_p20' ];

  constructor(props: Props) {
    super(props);

    this.stopPropagation = this.stopPropagation.bind(this);
  }
  public componentDidMount() {
    this.createLink(this.props);
  }
  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.stateToShare) {
      const prevStateToShare = this.props.stateToShare ? JSON.stringify(this.props.stateToShare) : '';
      if (JSON.stringify(nextProps.stateToShare) !== prevStateToShare) {
        this.createLink(nextProps);
      }
    }
  }
  public onLinkChange = () => this.createLink(this.props);

  public handleChange = (value: number) => {
    return () => {
      this.setState({ value });
      this.createLink(this.props, value);
    };
  }
  // checkedoption i.e 1 is default 2 is as configured
  public async createLink(props: Props, checkedOption = 2) {
    if (!props.stateToShare) { return this.state; }
    const currentUrl = window.location.href.split('?')[0];
    const chartState =
      checkedOption === 1 && props.stateToShare ?
        { ...props.stateToShare, year: null } : props.stateToShare;
    const link = `${currentUrl}?state=${JSON.stringify(chartState)}`;
    const shortURL: string = link.includes('localhost') ? link : await getShortURL(link);
    this.setState({ link: shortURL });

    return shortURL;
  }
  // tslint:disable jsx-no-lambda
  public render() {
    const { className, size, color, label, background, hover, fontSize, iconName, fontWeight } = this.props;

    return (
      <Modal
        trigger={
          <ButtonWrapper background={ background } hover={ hover }>
            <Button.Group>
              <Button className={ className } size={ size } color={ color }>
                <Icon name={ iconName || 'share alternate' } />
                <Span fontWeight={ fontWeight || 'normal' } fontSize={ fontSize || '1em' }>
                  { label || 'Share this chart' }
                </Span>
              </Button>
              { this.renderDownloadButton() }
            </Button.Group>
          </ButtonWrapper>
        }
        size="tiny"
        closeIcon="close"
      >
        <Modal.Content>
          <Modal.Description style={ { padding: '5em' } }>
              <h4>Share this visualisation</h4>
              <input
                type="radio"
                value={ 1 }
                checked={ this.state.value === 1 }
                onChange={ this.handleChange(1) }
              /> in default view <br />
              <input
                type="radio"
                value={ 2 }
                checked={ this.state.value === 2 }
                onChange={ this.handleChange(2) }
              /> as I configured it<br />
              <StyledInput value={ this.state.link } onChange={ this.onLinkChange } />
              <Div marginTop={ '1.5em' }>
                <a href={ `http://www.facebook.com/share.php?u=${this.state.link}` }>
                  <Button icon="facebook f" onClick={ () => this.updateShareAnalytics('facebook') } />
                </a>
                <a href={ `https://twitter.com/intent/tweet?text=${this.state.link}&source=webclient"` }>
                  <Button icon="twitter" onClick={ () => this.updateShareAnalytics('twitter') } />
                </a>
                <a
                  href={ `mailto:?subject=Development Initiatives: Uganda&body=Development Initiatives:
                  Uganda — ${this.state.link}` }
                >
                  <Button icon="mail" onClick={ () => this.updateShareAnalytics('mail') } />
                </a>
              </Div>
          </Modal.Description>
        </Modal.Content>
      </Modal>);
  }

  private renderDownloadButton() {
    const { download, stateToShare } = this.props;
    if (download) {
      let url = '';
      if (stateToShare && stateToShare.indicator && this.noDownloadSupport.indexOf(stateToShare.indicator) === -1) {
        const indicator = stateToShare.indicator.indexOf('.') > -1
          ? stateToShare.indicator.split('.')[1].replace(/-/g, '_')
          : stateToShare.indicator;
        url = `${getWarehouseAPILink}/single_table?indicator=${indicator}&format=csv`;
      } else {
        return null;
      }

      return (
        <a href={ url } className="ui medium button" onClick={ this.stopPropagation }>
          <i aria-hidden="true" className="download alternate icon"/>
          Download Data
        </a>
      );
    }

    return null;
  }

  private updateShareAnalytics(source: 'facebook' | 'twitter' | 'mail') {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'share', {
        event_category: source,
        event_label: this.state.link
      });
    }
  }

  private stopPropagation(event: React.MouseEvent<HTMLAnchorElement>) {
    event.stopPropagation();
  }
}
