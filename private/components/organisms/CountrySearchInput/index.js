// @flow
import React from 'react';
import SearchInput from 'components/molecules/SearchInput';
import data from './data';
import ugandaData from './ug-data';

type Props = {
  visible: boolean,
  profile: boolean,
  country?: string, // for regional profile
  placeholder?: string,
};

const countryData = {uganda: ugandaData};

const SearchwithData = (props: Props) =>
  (<SearchInput
    countries={props.country ? countryData[props.country].districts : data.countries}
    routePath={props.country || 'country'} // for route
    visible={props.visible}
    profile={props.profile}
    placeholder={props.placeholder || 'Type a country name...'}
  />);

export default SearchwithData;
