// @flow
import React from 'react';
import SearchInput from 'components/molecules/SearchInput';
import data from './data';

type Props = {
  visible: boolean,
  profile: boolean,
  placeholder: string,
}
const SearchwithData = (props: Props) =>
  (<SearchInput
    countries={data}
    visible={props.visible}
    profile={props.profile}
    placeholder={props.placeholder}
  />);


export default SearchwithData;
