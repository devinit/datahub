// @flow
import {REHYDRATE} from 'redux-persist/constants';
import globalThemes from 'components/organisms/GlobalPictureNavTabs/data';
import spotlightUgandaThemes from 'components/organisms/SpotLightNavTabs/ug-data.js';
import {GLOBAL_INDICATOR, SPOTLIGHT_INDICATOR} from './actions';
import type {GlobalIndicator, SpotLightlIndicator} from './actions';


export type Action = GlobalIndicator & SpotLightlIndicator & {
  payload: {
    apollo: any
  }
}

export type State = {
  rehydrated: boolean,
  spotlightIndicator: string,
  globalIndicator: string
}

export type Reducer = (state: State, action: Action) => State;

export const inititial: State = {
  rehydrated: false,
  spotlightIndicator: spotlightUgandaThemes.spotlightThemes[0].default_indicator,
  globalIndicator: globalThemes.globalPictureThemes[0].default_indicator
};

export const app = {
  app: (state: State = inititial, action: Action): State => {
    switch (action.type) {
      case REHYDRATE: {
        return {...state, rehydrated: true};
      }
      case GLOBAL_INDICATOR: {
        return {...state, globalIndicator: action.globalIndicator};
      }
      case SPOTLIGHT_INDICATOR: {
        return {...state, spotlightIndicator: action.spotlightIndicator};
      }
      default: return state;
    }
  }
};

export const apolloWrapper = (apolloReducer: Reducer) =>
  (state: State, action: Action): State => {
    switch (action.type) {
      case REHYDRATE: {
        return {...state, ...action.payload.apollo};
      }
      default: return apolloReducer(state, action);
    }
  };
