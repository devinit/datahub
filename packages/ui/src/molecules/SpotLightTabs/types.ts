import {SpotLightTabDataQuery} from '../../gql-types';
import { PageUnit} from '@devinit/dh-base/lib/pageData';

export interface CProps {
    currency: string;
    pageData: PageUnit[];
}

export type CSProps = CProps & SpotLightTabDataQuery;
