import * as React from 'react';
import SearchInput from './Basic';
import ugandaData from './uganda';
import kenyaData from './kenya';
import data from './global';
import { SingletonRouter } from 'next/router';
import { LinkState } from 'next/link';
import ErrorBoundary from '../ErrorBoundary';

const countryData = (country: string) => {
    const _data = country === 'uganda' ? ugandaData : kenyaData;

    return _data.districts.map(obj => ({ ...obj, slug: obj.name.toLowerCase() }));
};

export interface Props {
    router?: SingletonRouter;
    nextLink?: React.ComponentClass<LinkState>;
    country?: string;
    profile?: boolean;
    placeholder?: string;
}

export const ProfileSearch: React.SFC<Props> = (props: Props) =>
    <ErrorBoundary>
        <SearchInput
            entities={ props.country ? countryData(props.country) : data.countries }
            routePath={ props.country || 'country' } // for route
            visible={ true }
            router={ props.router }
            nextLink={ props.nextLink }
            profile={ props.profile !== undefined ? props.profile : true }
            placeholder={ props.placeholder || 'Type a country name...' }
        />
    </ErrorBoundary>;

export { default as GlobalPictureSearch } from './GlobalPicture';
