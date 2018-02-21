import {GlamorousComponent} from 'glamorous';
// Feels like a hack, but its basically including ambient types from datahub-api
import '@devinit/datahub-api';

export type GlamorousComponentT = GlamorousComponent<any, any>;
