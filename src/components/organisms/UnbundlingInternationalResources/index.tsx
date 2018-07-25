import glamorous from 'glamorous';
import { groupBy } from 'ramda';
import * as React from 'react';
import { ChildProps, graphql } from 'react-apollo';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { NoDataAvailableContainer } from '../../atoms/Container';
import TreeChart from '../../atoms/TreeChart';
import { UnbundlingIntlResourcesQuery } from '../../gql-types';
import { UProps } from '../../molecules/AreaPartitionChart';
import SINGLE_RESOURCE_QUERY from './query.graphql';

type TChildProps = ChildProps<UProps, UnbundlingIntlResourcesQuery>;

const Container = glamorous.div({
  position: 'relative'
});

const withData = graphql<UnbundlingIntlResourcesQuery, UProps, TChildProps>(SINGLE_RESOURCE_QUERY, {
  options: props => {
    return {
      variables: {
        groupById: props.groupById,
        countryId: props.countryId,
        resourceId: props.resourceId
      }
    };
  },
  skip: props => !props.shouldFetch
});

class UnbundlingTreemap extends React.Component<TChildProps> {
  render() {
    const { data, year } = this.props;
    if (!data) {
      return <p>Missing data key</p>;
    }
    if (data && data.error) {
      return <p>Error: { data.error }</p>;
    }
    const loading = data.loading;
    // TODO: single resouces is not nullable by api types, but apollo codegen doesnt seem to get that
    const { color = '#888', resources = [] } = data.singleResource || {};
    const bundles = resources
      ? groupBy((d) => d.year.toString(), (resources as DH.IIndicatorData[]))
      : [];

    return (
      <div>
        <Container>
          {
            loading || !((bundles || {})[year] || []).length
              ? this.renderSegment(loading, color)
              : this.renderTreeChart(color, bundles)
          }
        </Container>
      </div>
    );
  }

  private renderSegment(loading: boolean, color: string) {
    return (
      <Segment
        basic
        style={ {
          position: 'absolute',
          width: '100%',
          left: 0,
          right: 0,
          height: '360px',
          padding: 0
        } }
      >
        <Dimmer style={ { backgroundColor: color || '#888', zIndex: 1, height: '100%' } } active>
          { loading ? <Loader /> : this.renderNoDataAvailable() }
        </Dimmer>
      </Segment>
    );
  }

  private renderTreeChart(color: string, bundles: any) {
    return (
      <TreeChart
        config={ {
          ...this.props.config,
          colors: [ color ],
          coloring: null,
          tree: {
            ...this.props.config.tree,
            id: 'name'
          }
        } }
        data={ bundles[this.props.year] || [] }
        height="360px"
      />
    );
  }

  private renderNoDataAvailable(): React.ReactNode {
    return (
      <NoDataAvailableContainer>
        Detailed data is not available for this year
      </NoDataAvailableContainer>
    );
  }
}

export default withData(UnbundlingTreemap);
