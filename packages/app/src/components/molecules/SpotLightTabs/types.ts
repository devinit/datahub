import {SpotLightTabDataQuery} from '../../gql-types';
import { PageUnit} from '../../pageData';

export interface CProps {
    currency: string;
    pageData: PageUnit[];
}

export type CSProps = CProps & SpotLightTabDataQuery;
