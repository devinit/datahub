// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import glamorous from 'glamorous';
import { groupBy } from 'ramda';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import TreeChart from 'components/atoms/TreeChart';
import QUERY from './query.graphql';

export type Props = {
  loading: boolean,
  color: string,
  config: Object,
  bundles: Object[],
};

const Container = glamorous.div({
  position: 'relative',
});

const NoDataAvailableContainer = glamorous.div({
  padding: '2em',
  fontSize: '1.4em',
});

const withData = graphql(QUERY, {
  options: (props) => {
    return {
      variables: {
        groupById: props.groupBy,
        countryId: props.country,
        resourceId: props.flow,
      },
    };
  },
  props: ({ data }) => {
    const { error, loading } = data;

    if (error) {
      console.error(error);
    }

    const { color = '#abc', bundles = [] } = (data.singleResource || {});

    return loading ?
      { loading } :
      {
        color,
        bundles: groupBy(d => d.year, bundles)
      };
  },
});

const UnbundlingTreemap = (props: Props) => {
  return (
    <div>

      <Container>
        {props.loading || !(props.bundles[props.year] || []).length ?
          <Segment
            basic
            style={{
              position: 'absolute',
              width: '100%',
              left: 0,
              right: 0,
              height: '360px',
            }}
          >
            <Dimmer style={{ backgroundColor: props.color || '#888', zIndex: 1 }} active>
              {props.loading ?
                <Loader /> :
                <NoDataAvailableContainer>
                  Detailed data is not available for this year
                </NoDataAvailableContainer>
              }
            </Dimmer>
          </Segment> :
          <TreeChart
            config={{
              ...props.config,
              colors: [props.color],
              coloring: null,
              tree: {
                ...props.config.tree,
                id: 'name',
              }
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

