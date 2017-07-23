// @flow
export const GLOBAL_INDICATOR = 'GLOBAL_INDICATOR';
export const SPOTLIGHT_INDICATOR = 'SPOTLIGHT_INDICATOR';

type ActionBase = {
  type: string
}
export type GlobalIndicator = ActionBase & {
  globalIndicator: string
}
export type SpotLightlIndicator = ActionBase & {
  spotlightIndicator: string
}

export const changeGlobalIndicator = (globalIndicator: string) =>
  (dispatch: Dispatch<GlobalIndicator>): Dispatch<GlobalIndicator> =>
    dispatch({ type: GLOBAL_INDICATOR, globalIndicator});

export const changeSpotlightIndicator = (spotlightIndicator: string) =>
  (dispatch: Dispatch<SpotLightlIndicator>): Dispatch<SpotLightlIndicator> =>
    dispatch({ type: SPOTLIGHT_INDICATOR, spotlightIndicator});
