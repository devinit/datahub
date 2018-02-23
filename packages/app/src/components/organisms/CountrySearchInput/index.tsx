import * as React from 'react';
import SearchInput from '@devinit/dh-ui/lib/molecules/SearchInput';
import data from '@devinit/dh-base/lib/__generated__/data';
import ugandaData from '@devinit/dh-base/lib/__generated__/uganda';
import kenyaData from '@devinit/dh-base/lib/__generated__/kenya';

interface Props  {
  visible: boolean;
  profile: boolean;
  country?: string; // for regional profile
  placeholder?: string;
}

const countryData = (country: string) => {
  const _data = country === 'uganda' ? ugandaData : kenyaData;
  return _data.districts.map(obj => ({...obj, slug: obj.name.toLowerCase()}));
};

const SearchwithData: React.SFC<Props> = (props) =>
  (<SearchInput
    entities={props.country ? countryData(props.country) : data.countries}
    routePath={props.country || 'country'} // for route
    visible={props.visible}
    profile={props.profile}
    placeholder={props.placeholder || 'Type a country name...'}
  />);

export default SearchwithData;
