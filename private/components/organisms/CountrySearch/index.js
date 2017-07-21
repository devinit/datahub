import React from 'react';
import { graphql} from 'react-apollo';
import SearchInput from 'components/molecules/SearchInput';
import COUNTRIES_QUERY from '../../../graphql/Countries.graphql';

const SearchwithData = graphql(COUNTRIES_QUERY, {
  props: ({data: { loading, countries, error }}) => {
    if (error) console.error(error);
    return {
      loading,
      countries,
      visible: true,
      placeholder: 'Type Your Country Name'
    };
  }})(SearchInput);

export default SearchwithData;
