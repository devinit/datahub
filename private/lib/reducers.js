// @flow
import {REHYDRATE} from 'redux-persist/constants';
import globalThemes from 'components/organisms/GlobalPictureNavTabs/data';
import spotlightUgandaThemes from 'components/organisms/SpotLightNavTabs/ug-data';
import {GLOBAL_INDICATOR, SPOTLIGHT_INDICATOR} from './actions';
import type {GlobalIndicator, SpotLightlIndicator} from './actions';


export type Action = GlobalIndicator & SpotLightlIndicator & {
  payload: {
    apollo: Object
  }
}
type AppState = {
  rehydrated: boolean,
  spotlightIndicator: string,
  globalIndicator: string,
}
export type State = {
  app: AppState,
  apollo: Object
}
type Reducer<S, A> = (state: S, action: A) => S;

export type AppReducers <S, A> = {
  app: Reducer<S, A>
}
export const initialState: AppState = {
  rehydrated: false,
  spotlightIndicator: spotlightUgandaThemes.spotlightThemes[0].default_indicator,
  globalIndicator: globalThemes.globalPictureThemes[0].default_indicator
};

export const app: AppReducers<AppState, Action> = {
  app: (state: AppState = initialState, action: Action): AppState => {
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

export const apolloWrapper = (apolloReducer: Reducer<AppState, Action>) =>
  (state: AppState, action: Action) => {
    switch (action.type) {
      case REHYDRATE: {
        return process.browser ? {...state, ...action.payload.apollo} : state;
      }
      default: return apolloReducer(state, action);
    }
  };
