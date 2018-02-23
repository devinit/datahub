import {Action} from 'redux';
export const GLOBAL_INDICATOR = 'GLOBAL_INDICATOR';
export const SPOTLIGHT_INDICATOR_KE = 'SPOTLIGHT_INDICATOR_KE';
export const SPOTLIGHT_INDICATOR_UG = 'SPOTLIGHT_INDICATOR_UG';
export const LOADING_STATUS = 'LOADING_STATUS';

export type GlobalIndicator = Action & {
  globalIndicator: string,
};
export type SpotLightlIndicatorKe = Action & {
  indicatorKenya: string,
};
export type SpotLightlIndicatorUg = Action & {
  indicatorUganda: string,
};

export type LoadingStatus = Action & {
  loading: boolean;
};

export const changeLoadingStatus = (loading: boolean): LoadingStatus => ({
  type: LOADING_STATUS,
  loading,
});

export const changeGlobalIndicator = (globalIndicator: string): GlobalIndicator => ({
  type: GLOBAL_INDICATOR,
  globalIndicator,
});

export const changeSpotlightIndicatorUg = (
  indicatorUganda: string,
): SpotLightlIndicatorUg => ({ type: SPOTLIGHT_INDICATOR_UG, indicatorUganda });

export const changeSpotlightIndicatorKe = (
  indicatorKenya: string,
): SpotLightlIndicatorKe => ({ type: SPOTLIGHT_INDICATOR_KE, indicatorKenya });
