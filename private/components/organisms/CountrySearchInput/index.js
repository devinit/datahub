// @flow
import React from 'react';
import SearchInput from 'components/molecules/SearchInput';
import data from './data';
import ugData from './ug-data';

type Props = {
  visible: boolean,
  profile: boolean,
  country?: string, // for regional profile
  placeholder?: string,
};

const countryData = {uganda: ugData.districts.map(obj => ({...obj, slug: obj.name.toLowerCase()}))};

const SearchwithData = (props: Props) =>
  (<SearchInput
    entities={props.country ? countryData[props.country] : data.countries}
    routePath={props.country || 'country'} // for route
    visible={props.visible}
    profile={props.profile}
    placeholder={props.placeholder || 'Type a country name...'}
  />);

export default SearchwithData;
