// @flow
import React from 'react';
import SearchInput from 'components/molecules/SearchInput';
import data from './data';

type Props = {
  visible: boolean
}
const SearchwithData = (props: Props) =>
  (<SearchInput
    countries={data}
    visible={props.visible}
    placeholder={'Type a country name'}
  />);


export default SearchwithData;
