// @flow
import React from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import glamorous from 'glamorous';
import { graphql } from 'react-apollo';
import QUERY from '../../../graphql/UnbundlingAid.graphql';
import UnbundlingTreemap from '../../molecules/UnbundlingTreemap';

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

const Relative = glamorous.div({
  position: 'relative',
});

const buttonStyle = {
  position: 'absolute',
  right: '1em',
  top: '0.3em',
};

class Chart extends React.Component {
  // eslint-disable-next-line react/sort-comp
  state: {
    compare: boolean,
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      compare: false,
    };
  }

  toggleCompare() {
    this.setState({ compare: !this.state.compare });
  }

  render() {
    return (
      <Relative>
        {!this.state.compare
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
          </Grid>}
        <Button style={buttonStyle} onClick={() => this.toggleCompare()}>
          {this.state.compare
            ? <span>
                Close <Icon name="close" />
            </span>
            : <span>
                Compare <Icon name="plus" />
            </span>}
        </Button>
      </Relative>
    );
  }
}

export default Chart;
