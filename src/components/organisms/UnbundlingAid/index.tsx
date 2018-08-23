import { Div } from 'glamorous';
import * as React from 'react';
import * as introJS from 'intro.js';
import { ChildProps, graphql } from 'react-apollo';
import { Button, Grid, Icon } from 'semantic-ui-react';
import { UnbundlingAidDataQuery } from '../../gql-types';
import ErrorBoundary from '../../molecules/ErrorBoundary';
import { Selections, TotalODA, Treemap } from '../../molecules/UnbundlingAid';
import dataODA from './data-oda';
import dataOOF from './data-oof';
import QUERY from './query.graphql';
import { Intro } from '../../atoms/Intro';
/* tslint:disable no-nested-ternary */

interface State {
  compare: boolean;
  showTreemap: boolean;
  showTour: boolean;
}
interface InitialQuery {
  aidType: string;
  startYear: number;
  compact?: boolean;
}

interface Props {
  tourVisible: boolean;
  aidType: string;
}

type TChildProps = ChildProps<InitialQuery, UnbundlingAidDataQuery>;

// for fetching inital unbundling aid data, subsequent data fetches are done in
// the unbundling aid molecule
const withData = graphql<UnbundlingAidDataQuery, InitialQuery>(QUERY, {
  options: props => ({
    variables: {
      args: {
        aidType: props.aidType,
        year: props.startYear,
        groupBy: 'to_di_id'
      }
    }
  })
});

const toDropDownOptions = list => [
  { name: 'All', value: '', key: 'all', active: true },

  ...list.map(({ id, name }) => ({ name, value: id, key: id }))
];

export const unbundlingSelections = (aidType, startYear): Selections => {
  const selections = aidType === 'oda' ? dataODA.selections : dataOOF.selections;
  const { channels = [], bundles = [], to = [], from = [], sectors = [], years = [] } = selections;

  return {
    years: years.map(year => ({
      name: `${year}`,
      value: `${year}`,
      key: `${year}`,
      active: year === startYear
    })),
    to: toDropDownOptions(to),
    from: toDropDownOptions(from),
    sectors: toDropDownOptions(sectors),
    forms: toDropDownOptions(bundles),
    channels: toDropDownOptions(channels)
  };
};

const WithData = withData(({ data, aidType, startYear, compact }: TChildProps) => {
  const selections = unbundlingSelections(aidType, startYear);
  if (!data) {
    return <p>data key is missing</p>;
  }
  const safeBundles = data.bundles && data.bundles.length ? data.bundles : [];
  const bundleSum = safeBundles.reduce((sum, datum) => sum + (datum && datum.value || 0), 0);
  const props = {
    startYear,
    aidType,
    compact,
    loading: data.loading === undefined ? true : data.loading,
    selections,
    bundles: safeBundles as DH.IAidUnit[],
    bundleSum,
    refetch: data.refetch
  };
  if (data.error) { console.error(data.error); }

  return (
    <ErrorBoundary message="Unbundling treemap errored: ">
      <Treemap { ...props } />
    </ErrorBoundary>
  );
});

export default class UnbundlingChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      compare: false,
      showTreemap: props.tourVisible,
      showTour: props.tourVisible
    };
  }

  render() {
    const startYear = this.props.aidType === 'oda' ? dataODA.yearTotal.year : dataOOF.yearTotal.year;
    const uProps = { ...this.props, startYear };

    return (
      <Div position="relative">
        {
          !this.state.showTreemap
            ?
            <TotalODA
              onClickHandler={ this.showTreemapHandler }
              yearTotal={ this.props.aidType === 'oda' ? dataODA.yearTotal : dataOOF.yearTotal }
              aidType={ this.props.aidType }
            />
            :
            !this.state.compare
              ?
              <WithData { ...uProps } />
              :
              <Grid style={ { margin: 0 } }>
                <Grid.Row style={ { padding: 0 } }>
                  <Grid.Column width={ 8 } style={ { padding: 0 } }>
                    <WithData compact { ...uProps } />
                  </Grid.Column>
                  <Grid.Column width={ 8 } style={ { padding: 0 } }>
                    <WithData compact { ...uProps } />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
        }
          <Button
            onClick={ this.toggleCompare }
            style={ { position: 'absolute', right: '1em', top: '1.5em' } }
          >
            <Intro step={ 2 } intro="Click to view two tree maps side by side">
            {
              this.state.compare
                ?
                <span>
                  Close <Icon name="close" />
                </span>
                :
                <span>
                  Compare <Icon name="plus" />
                </span>
              }
            </Intro>
          </Button>
      </Div>
    );
  }

  componentWillReceiveProps(props: Props) {
    this.setState({
      showTreemap: this.state.showTreemap || props.tourVisible,
      showTour: props.tourVisible
    });
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (!prevState.showTour && this.state.showTour) {
      introJS()
        .start()
        .oncomplete(() => this.setState({ showTour: false }))
        .onexit(() => this.setState({ showTour: false }));
    }
  }

  showTreemapHandler = () => {
    this.setState({ showTreemap: true });
  }

  toggleCompare = () => {
    this.setState({ compare: !this.state.compare });
  }

  closeTour = () => {
    this.setState({
      showTour: false
    });
  }
}
