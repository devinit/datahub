import * as React from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import {Div} from 'glamorous';
import { graphql, ChildProps } from 'react-apollo';
import {Treemap, TotalODA, Selections} from '../../molecules/UnbundlingAid';
import UnbundlingAidTour from '../../atoms/UnbundlingAidTour';
import TourContainer from '../../molecules/TourContainer';
import {UnbundlingAidDataQuery} from '../../gql-types';
import QUERY from './query.graphql';
import dataODA from './data-oda';
import dataOOF from './data-oof';
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
        groupBy: 'to_di_id',
      },
    },
  })
});

const toDropDownOptions = list => [
  { name: 'All', value: '', key: 'all', active: true },

  ...list.map(({ id, name }) => ({ name, value: id, key: id })),
];

export const unbundlingSelections = (aidType, startYear): Selections => {
  const { channels = [], bundles = [], to = [], from = [], sectors = [], years = [] } =
    aidType === 'oda' ? dataODA.selections : dataOOF.selections;
  return {
    years: years.map(year => ({
      name: `${year}`,
      value: `${year}`,
      key: `${year}`,
      active: year === startYear,
    })),

    to: toDropDownOptions(to),

    from: toDropDownOptions(from),

    sectors: toDropDownOptions(sectors),

    forms: toDropDownOptions(bundles),

    channels: toDropDownOptions(channels),
  };
};

const WithData = withData(({data, aidType, startYear, compact}: TChildProps) => {
    const selections = unbundlingSelections(aidType, startYear);
    if (!data) return <p>data key is missing</p>;
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

      refetch: data.refetch,
    };
    if (data.error) console.error(data.error);
    return <Treemap {...props} />;
});

export default class UnbundlingChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      compare: false,
      showTreemap: props.tourVisible,
      showTour: props.tourVisible,
    };
  }
  public componentWillReceiveProps(props: Props) {
    this.setState({
      showTreemap: this.state.showTreemap || props.tourVisible,
      showTour: props.tourVisible,
    });
  }
  public showTreemapHandler = () => {
    this.setState({showTreemap: true});
  }
  public toggleCompare = () => {
    this.setState({ compare: !this.state.compare });
  }
  public closeTour = () => {
    this.setState({
      showTour: false,
    });
  }

  public render() {
    const startYear = this.props.aidType === 'oda' ? dataODA.yearTotal.year : dataOOF.yearTotal.year;
    const uProps = {...this.props, startYear};
    return (
      <Div position="relative">
        {
          !this.state.showTreemap ?
            <TotalODA
              onClickHandler={this.showTreemapHandler}
              yearTotal={this.props.aidType === 'oda' ? dataODA.yearTotal : dataOOF.yearTotal}
              aidType={this.props.aidType}
            /> :
            !this.state.compare
              ? <WithData {...uProps} />
              : <Grid style={{ margin: 0 }}>
                <Grid.Row style={{ padding: 0 }}>
                  <Grid.Column width={8} style={{ padding: 0 }}>
                    <WithData compact {...uProps} />
                  </Grid.Column>
                  <Grid.Column width={8} style={{ padding: 0}}>
                    <WithData compact {...uProps}  />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
        }
        <Button
          style={{ position: 'absolute', right: '1em', top: '1.2em'}}
          onClick={this.toggleCompare}
        >
          {this.state.compare
            ? <span>
                Close <Icon name="close" />
            </span>
            : <span>
                Compare <Icon name="plus" />
            </span>}
        </Button>
        <TourContainer
          visible={this.state.showTour}
          closeHandler={this.closeTour}
        >
          <UnbundlingAidTour aidType={this.props.aidType === 'oda' ? 'ODA' : 'OOFs'} />
        </TourContainer>
      </Div>
    );
  }
}
