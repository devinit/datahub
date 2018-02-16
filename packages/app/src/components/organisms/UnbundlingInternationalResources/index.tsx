import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import glamorous from 'glamorous';
import { groupBy } from 'ramda';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import TreeChart from '@devinit/dh-ui/lib/atoms/TreeChart';
import {NoDataAvailableContainer} from '@devinit/dh-ui/lib/atoms/Container';
import {UProps} from '@devinit/dh-ui/lib/molecules/AreaPartitionChart';
import {UnbundlingIntlResourcesQuery} from '../../../types';
import QUERY from './query.graphql';

type TChildProps = ChildProps<UProps, UnbundlingIntlResourcesQuery>;

const Container = glamorous.div({
  position: 'relative',
});

const withData = graphql<UnbundlingIntlResourcesQuery, UProps, TChildProps>(QUERY, {
  options: props => {
    return {
      variables: {
        groupById: props.groupById,
        countryId: props.countryId,
        resourceId: props.resourceId,
      },
    };
  },
  skip: props => !props.shouldFetch
});

const UnbundlingTreemap: React.SFC<TChildProps> = ({data, year, config}) => {
  if (!data) return <p>Missing data key</p>;
  if (data && data.error) return <p>Error:  ${data.error}</p>;
  const loading = data.loading;
  // TODO: single resouces is not nullable by api types, but apollo codegen doesnt seem to get that
  const {color = '#888', resources = []} = data.singleResource || {};
  const bundles = resources ? groupBy((d) => d.year.toString(), (resources as DH.IIndicatorData[])) : [];
  return (
    <div>
      <Container>
        {loading || !((bundles || {})[year] || []).length
          ? <Segment
            basic
            style={{
              position: 'absolute',
              width: '100%',
              left: 0,
              right: 0,
              height: '360px',
              padding: 0,
            }}
          >
            <Dimmer
              style={{ backgroundColor: color || '#888', zIndex: 1, height: '100%' }}
              active
            >
              {loading
                ? <Loader />
                : <NoDataAvailableContainer>
                      Detailed data is not available for this year
                </NoDataAvailableContainer>}
            </Dimmer>
          </Segment>
          : <TreeChart
            config={{
              ...config,
              colors: [color],
              coloring: null,
              tree: {
                ...config.tree,
                id: 'name',
              },
            }}
            data={bundles[year] || []}
            height="360px"
          />}
      </Container>
    </div>
  );
};

export default withData(UnbundlingTreemap);
