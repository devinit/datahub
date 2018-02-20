import * as React from 'react';
import SearchInput from '@devinit/dh-ui/lib/molecules/SearchInput';
import data from '@devinit/dh-base/lib/__generated__/data';
import ugandaData from '@devinit/dh-base/lib/__generated__/uganda';
import kenyaData from '@devinit/dh-base/lib/__generated__/kenya';
const countryData = (country) => {
    const _data = country === 'uganda' ? ugandaData : kenyaData;
    return _data.districts.map(obj => ({ ...obj, slug: obj.name.toLowerCase() }));
};
const SearchwithData = (props) => (React.createElement(SearchInput, { entities: props.country ? countryData(props.country) : data.countries, routePath: props.country || 'country', visible: props.visible, profile: props.profile, placeholder: props.placeholder || 'Type a country name...' }));
export default SearchwithData;
