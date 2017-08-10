// @flow
import countriesData from 'components/organisms/CountrySearchInput/data';

export const getCountryName = (slug: string): string => {
  const country = countriesData.countries.find(country => country.slug === slug);
  if (country && country.name) return country.name;
  return slug;
};
