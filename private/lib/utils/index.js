// @flow
import fetch from 'isomorphic-fetch';
import countriesData from 'components/organisms/CountrySearchInput/data';
import ugDistrictData from 'components/organisms/CountrySearchInput/ug-data';
import {RECIPIENT} from './constants';

export const getCountryName = (slug: string): string => {
  const country = countriesData.countries.find(country => country.slug === slug);
  if (country && country.name) return country.name;
  return slug;
};

export const getCountry = (slug: string): Country => {
  const country = countriesData.countries.find(country => country.slug === slug);
  if (!country) return {name: slug, countryType: RECIPIENT, slug, id: 'N/A'};
  return country;
};

export const getDistrictName = (slug: string, country: string): string => {
  // TODO: handle spotlight kenya
  if (country !== 'uganda') throw new Error('we are only dealing with spotlight uganda for now');
  const district = ugDistrictData.districts.find(district => district.slug === slug);
  if (district && district.name) return district.name;
  return slug;
};

export const printDiv = (divId: string) => {
  const divElem = document.getElementById(divId);
  const printContents = divElem && divElem.innerHTML ? divElem.innerHTML : 'Inavlid div id';
  const originalContents = document.body && document.body.innerHTML ? document.body.innerHTML : '';
  if (document.body && document.body.innerHTML) {
    document.body.innerHTML = printContents;
  }
  window.print();
  if (document.body && document.body.innerHTML) {
    document.body.innerHTML = originalContents;
  }
};

export const getShortURL = async (longUrl: string): Promise<string> => {
  // TODO: add access token to sever env virables
  const apiToken = '43c76f9ad7b4a259615aba8f682b55493477e467';
  const apiUrl = `https://api-ssl.bitly.com/v3/shorten?access_token=${apiToken}`;
  const response = await fetch(`${apiUrl}&longUrl=${longUrl}`);
  const json = await response.json();
  return json.data.url;
};
