import React from 'react';
import SearchInput from 'components/molecules/SearchInput';
import data from './data';

const SearchwithData = () =>
  (<SearchInput
    countries={data.countries}
    visible
    placeholder={'Type a country name'}
  />);


export default SearchwithData;
