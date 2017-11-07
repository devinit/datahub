// @flow
import React from 'react';
import SearchInput from 'components/molecules/SearchInput';
import data from './data';
import ugandaData from './uganda-data';
import kenyaData from './kenya-data';

type Props = {
  visible: boolean,
  profile: boolean,
  country?: string, // for regional profile
  placeholder?: string,
};

const countryData = (country: string) => {
  const data = country === 'uganda' ? ugandaData : kenyaData;
  return data.districts.map(obj => ({...obj, slug: obj.name.toLowerCase()}));
};

const SearchwithData = (props: Props) =>
  (<SearchInput
    entities={props.country ? countryData(props.country) : data.countries}
    routePath={props.country || 'country'} // for route
    visible={props.visible}
    profile={props.profile}
    placeholder={props.placeholder || 'Type a country name...'}
  />);

export default SearchwithData;
