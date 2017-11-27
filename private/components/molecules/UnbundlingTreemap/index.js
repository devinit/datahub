// @flow
import React from 'react';
import glamorous from 'glamorous';
import { Dimmer, Icon, Loader, Segment } from 'semantic-ui-react';
import { approximate } from 'lib/utils';
import { init } from 'ramda';
import { SectionHeader } from 'components/atoms/Header';
import TreeChart from '../../atoms/TreeChart';
// import type {Value} from '../UnbundlingAidChartToolBar';
import InteractiveChartToolBar from '../UnbundlingAidChartToolBar';

export type Props = {
  loading: boolean,
  compact: boolean,
  startYear: number,
  aidType: string,
  config: Object,
  selections: Object,
  bundles: Object[],
  bundleSum: number,
  refetch: (variables: Object) => any,
};

type Value = {
  key: string,
  value: string
}

type State = {
  position: number,
  keys: string[],
  values: Value[],
  dimmerColor?: string,
};
type Selected = {
  id: string,
  color: string,
  key: string
}
const Container = glamorous.div({
  margin: '1em 2em',
  height: '40em',
  position: 'relative',
  '& .plot-label-header': {
    fontSize: '1em !important',
    fontWeight: '600 !important'
  },
  '& .plot-label-value': {
    fontSize: '1em !important',
  },

  '&:hover .up': {
    display: 'block',
  },
});

const Up = glamorous.a({
  display: 'none',
  position: 'absolute',
  top: '42px',
  left: 0,
  width: '70px',
  padding: '5px',
  background: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1000,

  '&:hover': {
    background: 'rgba(0, 0, 0, 0.6)',
  },
});

class UnbundlingTreemap extends React.Component {
  static groupers = {
    years: 'year',
    to: 'to_di_id',
    from: 'from_di_id',
    sectors: 'sector',
    forms: 'bundle',
    channels: 'channel',
  };

  static addNewValue({key, value}: {key: string, value: string}, values: Value[]): Value[] {
    const valuesItems = values.filter((item) => item.key !== key);
    return value ? [...valuesItems, {key, value}] : valuesItems;
  }

  static getActiveOption(position: number): string {
    const activeName = Object.keys(UnbundlingTreemap.groupers)[position];
    return UnbundlingTreemap.groupers[activeName];
  }
  // eslint-disable-next-line react/sort-comp
  state: State;

  constructor(props: Props) {
    super(props);

    const position = 1;

    const keys = Object.keys(props.selections);

    const values = [{key: 'years', value: props.startYear.toString()}];

    this.state = { position, keys, values };
  }

  zoomIn({id, color}: Selected) {
    const position = this.state.position <= 1 ? 1 : this.state.position;

    if ((position + 1) < Object.keys(UnbundlingTreemap.groupers).length) {
      // const newKey = this.state.keys[position + 1];
      // TODO: check if key already exists
      const values = UnbundlingTreemap.addNewValue({key, value: id}, this.state.values);
      const active = UnbundlingTreemap.getActiveOption(position + 1);
      this.setState({position: position + 1, values, dimmerColor: color});
      this.fetch(active, values);
    } // else zoom out
  }

  zoomOut() {
    const position = this.state.position - 1;
    const values = init(this.state.values); // removes last entry
    this.setState({ position, values });
    const [key] = values[position] ? Object.keys[values[position]] : ['years'];
    this.fetch(key, values);
  }


  updateValue(key: string, value: string) {
    // making sure we dont have duplicates
    const values = UnbundlingTreemap.addNewValue({key, value}, this.state.values);
    this.setState({ values });
    const active = UnbundlingTreemap.getActiveOption(this.state.position);
    this.fetch(active, values);
  }

  fetch(active: string, values: Value[]) {
    const args = values
      .reduce((all, {key, value}) => {
        return {...all, [UnbundlingTreemap.groupers[key]]: value};
      }, {});
    console.log('args: ', args, active);
    const parameters = {
      aidType: this.props.aidType,
      args: {
        aidType: this.props.aidType,
        groupBy: active,
        ...args
      },
    };
    this.props.refetch(parameters);
  }

  render() {
    return (
      <div>
        <InteractiveChartToolBar
          aidType={this.props.aidType}
          compact={this.props.compact}
          position={this.state.position}
          values={this.state.values}
          toolBarOptions={this.props.selections}
          onChange={(key, value) => this.updateValue(key, value)}
        />

        <Container>
          <SectionHeader
            color="rgb(238, 238, 238)"
            style={{
              textTransform: 'none'
            }}
          >
            {this.props.aidType === 'oda' ?
              `US$ ${approximate(this.props.bundleSum)} total gross disbursements, 2015 prices` :
              `US$ ${approximate(this.props.bundleSum)} total gross disbursements, 2012 prices`
            }
          </SectionHeader>
          <div>
            {this.props.loading
              ? <Segment
                style={{
                  position: 'absolute',
                  width: '100%',
                  left: 0,
                  right: 0,
                  height: '36em',
                  padding: 0,
                  margin: 0,
                }}
              >
                <Dimmer style={{ backgroundColor: this.state.dimmerColor }} active>
                  <Loader />
                </Dimmer>
              </Segment>
              : <TreeChart
                config={this.props.config}
                data={this.props.bundles}
                height="36em"
                onClick={d => this.zoomIn(d)}
              />}
            {this.state.position <= 1
              ? ''
              : <Up className="up" onClick={() => this.zoomOut()}>
                <Icon name={'chevron left'} size="big" inverted />
              </Up>}
          </div>
        </Container>
      </div>
    );
  }
}

export default UnbundlingTreemap;
