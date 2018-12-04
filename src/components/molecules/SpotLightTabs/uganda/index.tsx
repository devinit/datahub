import { CProps } from '../types';
import { SpotLightTabDataQuery } from '../../../gql-types';
import Health from './Health';
import Education from './Education';
import Overview from '../Overview';
import Poverty from './Poverty';
import Population from './Population';

export type CProps = CProps; // make typescript happpy
export type SpotLightTabDataQuery = SpotLightTabDataQuery;  // make typescript happpy
export default { Health, Education, Overview, Population, Poverty };
