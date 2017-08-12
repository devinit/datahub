// @flow
import React from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import {Div} from 'glamorous';
import { graphql } from 'react-apollo';
import TotalODA from 'components/molecules/UnbundlingAidTotalODA';
import QUERY from './query.graphql';
import UnbundlingTreemap from '../../molecules/UnbundlingTreemap';

type Props = {
  aidType: string
}

const toDropDownOptions = list => [
  { name: 'All', value: '', key: 'all', active: true },

  ...list.map(({ id, name }) => ({ name, value: id, key: id })),
];

const withData = graphql(QUERY, {
  options: props => ({
    variables: {
      aidType: props.aidType,
      args: {
        aidType: props.aidType,
        year: props.startYear,
        groupBy: 'to_di_id',
      },
    },
  }),

  props: ({ ownProps, data }: { ownProps: Object, data: Object }) => {
    const { error, loading } = data;

    if (error) throw new Error(error);

    const { channels = [], bundles = [], to = [], from = [], sectors = [], years = [] } =
      data.selections || {};

    return {
      loading,

      selections: {
        years: years.map(year => ({
          name: year,
          value: year,
          active: year === ownProps.startYear,
        })),

        to: toDropDownOptions(to),

        from: toDropDownOptions(from),

        sectors: toDropDownOptions(sectors),

        forms: toDropDownOptions(bundles),

        channels: toDropDownOptions(channels),
      },

      bundles:
        data.bundles && data.bundles.length ? data.bundles : [{ name: 'No Results', value: 0 }],

      refetch: data.refetch,
    };
  },
});

// eslint-disable-next-line flowtype-errors/show-errors
const WithData = withData(UnbundlingTreemap);

const buttonStyle = {
  position: 'absolute',
  right: '1em',
  top: '0.3em',
};
// TODO: supply year oda and oof totals via a pull API
// TODO: supply selection options via pull API

class Chart extends React.Component {
  // eslint-disable-next-line react/sort-comp
  state: {
    compare: boolean,
    showTreemap: boolean
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      compare: false,
      showTreemap: false
    };
  }
  showTreemapHandler() {
    this.setState({showTreemap: true});
  }
  toggleCompare() {
    this.setState({ compare: !this.state.compare });
  }

  render() {
    console.log('props', this.props);
    /* eslint-disable no-nested-ternary */
    return (
      <Div position="relative">
        {
          !this.state.showTreemap ?
            <TotalODA
              onClickHandler={() => this.showTreemapHandler()}
              type={this.props.aidType}
            /> :
            !this.state.compare
              ? <WithData {...this.props} />
              : <Grid style={{ margin: 0 }}>
                <Grid.Row style={{ padding: 0 }}>
                  <Grid.Column width={8} style={{ padding: 0 }}>
                    <WithData compact {...this.props} />
                  </Grid.Column>
                  <Grid.Column width={8} style={{ padding: 0 }}>
                    <WithData compact {...this.props} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
        }
        <Button style={buttonStyle} onClick={() => this.toggleCompare()}>
          {this.state.compare
            ? <span>
                Close <Icon name="close" />
            </span>
            : <span>
                Compare <Icon name="plus" />
            </span>}
        </Button>
      </Div>
    );
  }
}

export default Chart;
