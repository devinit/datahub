// @flow
import React from 'react';
import glamorous from 'glamorous';
import {Dimmer, Icon, Loader, Segment} from 'semantic-ui-react';
import TreeChart from '../../atoms/TreeChart';
import InteractiveChartToolBar from '../UnbundlingAidChartToolBar/index';

export type Props = {
  loading: boolean,
  compact: boolean,
  startYear: number,
  aidType: string,
  config: Object,
  selections: Object,
  bundles: Object[],
  refetch: (variables: Object) => any,
}

type State = {
  position: number,
  keys: string[],
  values: string[],
  dimmerColor?: string,
}

const Container = glamorous.div({
  margin: '1em',
  height: '32em',
  position: 'relative'
});

const Up = glamorous.a({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '70px',
  padding: '5px',
  background: 'rgba(0, 0, 0, 0.4)',
  display: 'block',
  zIndex: 1000,

  '&:hover': {
    background: 'rgba(0, 0, 0, 0.6)'
  }
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

  // eslint-disable-next-line react/sort-comp
  state: State;

  constructor(props: Props) {
    super(props);

    const position = 1;

    const keys = Object.keys(props.selections);

    const values = [
      props.startYear.toString(),

      ...keys.slice(1).map(d => {
        const [selected] = props.selections[d].filter(x => x.active);
        return selected ? selected.value : '';
      })
    ];

    this.state = {position, keys, values};
  }

  zoomIn(selected: Object) {
    const position = this.state.position <= 1 ? 1 : this.state.position;

    const values = this.updateValueByPosition(position, selected.id);

    this.setState({position: position + 1, values, dimmerColor: selected.color});

    this.fetch(position + 1, this.state.keys, this.state.values);
  }

  zoomOut() {
    const position = this.state.position - 1;

    const values = this.updateValueByPosition(position, '');

    this.setState({position, values});

    this.fetch(position, this.state.keys, values);
  }

  updateValue(key: string, value: string) {
    const position = this.state.keys.indexOf(key);

    const values = this.updateValueByPosition(position, value);

    this.setState({values});

    this.fetch(this.state.position, this.state.keys, values);
  }

  updateValueByPosition(position: number, value: string) {
    const values = this.state.values;

    values[position] = value;

    return values;
  }

  fetch(position: number, keys: string[], values: string[]) {
    const parameters = {
      aidType: this.props.aidType,
      args: {
        aidType: this.props.aidType,
        groupBy: UnbundlingTreemap.groupers[keys[position]],

        ...values
          .map((value, index) => {
            return {key: UnbundlingTreemap.groupers[keys[index]], value};
          })
          .filter(d => d.value)
          .reduce((all, {key, value}) => ({...all, [key]: value}), {})
      }
    };
    this.props.refetch(parameters);
  }

  render() {
    return (<div>
      <InteractiveChartToolBar
        compact={this.props.compact}
        position={this.state.position}
        values={this.state.values}
        toolBarOptions={this.props.selections}
        onChange={(key, value) => this.updateValue(key, value)}
      />

      <Container>

        {this.props.loading ?
          <Segment
            style={{
              position: 'absolute',
              width: '100%',
              left: 0,
              right: 0,
              height: '100%'
            }}
          >
            <Dimmer style={{backgroundColor: this.state.dimmerColor}} active><Loader /></Dimmer>
          </Segment> :
          <TreeChart
            config={this.props.config}
            data={this.props.bundles}
            height="32em"
            onClick={d => this.zoomIn(d)}
          />
        }
        {this.state.position <= 1 ? '' :
        <Up onClick={() => this.zoomOut()}>
          <Icon name={'chevron left'} size="big" inverted />
        </Up>
        }
      </Container>
    </div>);
  }

}

export default UnbundlingTreemap;
