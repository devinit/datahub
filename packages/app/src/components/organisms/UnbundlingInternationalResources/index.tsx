// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import glamorous from 'glamorous';
import { groupBy } from 'ramda';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import TreeChart from '@devinit/dh-ui/lib/atoms/TreeChart';
import QUERY from './query.graphql';

export interface Props  {
  loading: boolean;
  color: string;
  year: number;
  config: object;
  bundles: any[];
}

const Container = glamorous.div({
  position: 'relative',
});

const withData = graphql(QUERY, {
  options: props => {
    return {
      variables: {
        groupById: props.groupBy,
        countryId: props.country,
        resourceId: props.flow,
      },
    };
  },
  skip: props => !props.shouldFetch,
  props: ({ data }) => {
    const { error, loading } = data;

    if (error) {
      console.error(error);
    }

    const { color = '#abc', resources = [] } = data.singleResource || {};

    return loading
      ? { loading }
      : {
        color,
        bundles: groupBy(d => d.year, resources),
      };
  },
});

const UnbundlingTreemap = (props: Props) => {
  return (
    <div>
      <Container>
        {props.loading || !((props.bundles || {})[props.year] || []).length
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
              style={{ backgroundColor: props.color || '#888', zIndex: 1, height: '100%' }}
              active
            >
              {props.loading
                ? <Loader />
                : <NoDataAvailableContainer>
                      Detailed data is not available for this year
                </NoDataAvailableContainer>}
            </Dimmer>
          </Segment>
          : <TreeChart
            config={{
              ...props.config,
              colors: [props.color],
              coloring: null,
              tree: {
                ...props.config.tree,
                id: 'name',
              },
            }}
            data={props.bundles[props.year] || []}
            height="360px"
            onClick={() => {}}
          />}
      </Container>
    </div>
  );
};

export default withData(UnbundlingTreemap);
