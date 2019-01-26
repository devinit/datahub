import * as React from 'react';
import glamorous from 'glamorous';
import { indexOf, init, last } from 'ramda';
import { Dimmer, Icon, Loader, Segment } from 'semantic-ui-react';
import { approximate } from '@devinit/prelude/lib/numbers';
import { SectionHeader } from '../../../atoms/Header';
import TreeChart from '../../../atoms/TreeChart';
import UnbundlingAidToolBar from '../UnbundlingAidToolBar';
import { KeyValue, Selections } from '../types';
import { Intro } from '../../../atoms/Intro';
import { howTo } from '../../../../utils/howTo';

export interface Props {
  loading: boolean;
  error?: string;
  compact?: boolean;
  startYear: number;
  aidType: string;
  config?: any;
  selections: Selections;
  bundles: DH.IAidUnit[];
  bundleSum: number;
  refetch: (variables: object) => any;
}

export type SelectionKey = 'to' | 'from' | 'sectors' | 'channels' | 'forms' | 'years';

export interface State {
  position: number;
  active: SelectionKey;
  keys: SelectionKey[];
  values: KeyValue[];
  dimmerColor?: string;
}

export interface Selected {
  id: string;
  color: string;
  key: string;
}
const Container = glamorous.div({
  'margin': '1em 2em',
  'height': '40em',
  'position': 'relative',
  '& .plot-label-header': {
    fontSize: '1em !important',
    fontWeight: '600 !important'
  },
  '& .plot-label-value': {
    fontSize: '1em !important'
  },

  '&:hover .up': {
    display: 'block'
  }
});

const Up = glamorous.a({
  'display': 'none',
  'position': 'absolute',
  'top': '42px',
  'left': 0,
  'width': '70px',
  'padding': '5px',
  'background': 'rgba(0, 0, 0, 0.4)',
  'zIndex': 1000,
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.6)'
  }
});

class UnbundlingTreemap extends React.Component<Props, State> {
  public static groupers = {
    years: 'year',
    to: 'to_di_id',
    from: 'from_di_id',
    sectors: 'sector',
    forms: 'bundle',
    channels: 'channel'
  };

  // we use history to store subsquent states, which we can replay back to
  public history: State[] = [];
  // adds new value to a key
  public static addNewValue({ key, value }: KeyValue, values: KeyValue[]): KeyValue[] {
    const valuesItems = values.filter((item) => item.key !== key);

    return value ? [ ...valuesItems, { key, value } ] : valuesItems;
  }

  constructor(props: Props) {
    super(props);

    const position = 0;
    const keys = Object.keys(props.selections).filter(key => key !== 'years') as SelectionKey[];
    const values = [ { key: 'years', value: props.startYear.toString() } ];
    this.state = { position, keys, values, active: 'to' };
    this.history.push(this.state);
    this.onMove = this.onMove.bind(this);
    this.onZoomIn = this.onZoomIn.bind(this);
    this.onZoomOut = this.onZoomOut.bind(this);
    this.updateValue = this.updateValue.bind(this);

  }

  public onZoomIn({ id, color }: Selected) {
    const position = this.state.position;

    if ((position + 1) < this.state.keys.length) {
      // const newKey = this.state.keys[position + 1];
      // TODO: check if key already exists
      const currentActive = this.state.keys[position];
      const values = UnbundlingTreemap.addNewValue({ key: currentActive, value: id }, this.state.values);
      const active = this.state.keys[position + 1] as SelectionKey;
      this.setState({ position: position + 1, values, dimmerColor: color, active });
      this.history.push(this.state);
      this.fetch(active, values);
    } // else zoom out
  }
  // we store states in this.history such that zoom-out is just a reversal back through those states
  public onZoomOut() {
    // remove latest history item
    const newHistory = init(this.history);
    const latestHistory = last(newHistory);
    this.history = newHistory;
    if (!latestHistory) { return false; }
    this.setState(latestHistory);
    this.fetch(latestHistory.active, latestHistory.values);
  }

  public updateValue(key: string) {
    return (value: string) => {
      // making sure we dont have duplicates
      const values = UnbundlingTreemap.addNewValue({ key, value }, this.state.values);
      const active = this.state.keys[this.state.position] as SelectionKey;
      this.setState({ values, active });
      this.history.push(this.state);
      this.fetch(active, values);
    };
  }

  public onMove(key: string, keys: SelectionKey[]) {
    const keyPosition = indexOf(key, keys);
    const oldPosition = indexOf(key, this.state.keys);
    if (keyPosition === this.state.position || oldPosition === this.state.position) {
      this.setState({ active: key as SelectionKey, keys });
      this.history.push(this.state);

      const keyToFetch = keyPosition === this.state.position ? key : keys[oldPosition];
      this.fetch(keyToFetch, this.state.values);
    } else {
      this.setState({ keys });
    }
  }

  public fetch(active: string, values: KeyValue[]) {
    const args = values.reduce((all, { key, value }) => {
      return { ...all, [UnbundlingTreemap.groupers[key]]: value };
    }, {});
    const parameters = {
      aidType: this.props.aidType,
      args: {
        aidType: this.props.aidType,
        groupBy: UnbundlingTreemap.groupers[active],
        ...args
      }
    };
    this.props.refetch(parameters);
  }

  public render() {
    return (
      <div>
        <UnbundlingAidToolBar
          aidType={ this.props.aidType }
          compact={ this.props.compact }
          position={ this.state.position }
          values={ this.state.values }
          toolBarOptions={ this.props.selections }
          // tslint:disable-next-line:jsx-no-lambda
          onMove={ this.onMove }
          onChange={ this.updateValue }
        />
        {
          this.props.error
            ?
            <p>
              An error occured while fetching required data,{ ' ' }
              please change your select options or refresh page.
              error: { this.props.error }
            </p>
            :
            <Container>
              <SectionHeader color="rgb(238, 238, 238)" style={ { textTransform: 'none' } }>
                {
                  this.props.aidType === 'oda'
                    ? `US$ ${approximate(this.props.bundleSum)} total gross disbursements, 2016 prices`
                    : `US$ ${approximate(this.props.bundleSum)} total gross disbursements, 2016 prices`
                }
              </SectionHeader>
              <Intro step={ 3 } intro={ howTo.unbundlingAid.treeChart }>
                {
                  this.props.loading
                    ?
                    <Segment
                      style={ {
                        position: 'absolute',
                        width: '100%',
                        left: 0,
                        right: 0,
                        height: '36em',
                        padding: 0,
                        margin: 0
                      } }
                    >
                    <Dimmer style={ { backgroundColor: this.state.dimmerColor } } active>
                      <Loader />
                    </Dimmer>
                    </Segment>
                    :
                    <TreeChart
                      data={ this.props.bundles }
                      height="36em"
                      onClick={ this.onZoomIn }
                    />
                  }
                  { this.renderBackButton() }
              </Intro>
            </Container>
        }

      </div>
    );
  }

  private renderBackButton() {
    if (this.state.position > 0) {
      return (
        <Up className="up" onClick={ this.onZoomOut }>
          <Icon name={ 'chevron left' } size="big" inverted />
        </Up>
      );
    }

    return null;
  }
}

export default UnbundlingTreemap;
