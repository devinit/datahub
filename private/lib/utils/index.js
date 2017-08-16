// @flow
import countriesData from 'components/organisms/CountrySearchInput/data';
import ugDistrictData from 'components/organisms/CountrySearchInput/ug-data';

export const getCountryName = (slug: string): string => {
  const country = countriesData.countries.find(country => country.slug === slug);
  if (country && country.name) return country.name;
  return slug;
};

export const getCountry = (slug: string): Country | void =>
  countriesData.countries.find(country => country.slug === slug);

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
