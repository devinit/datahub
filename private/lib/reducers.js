// @flow
import {REHYDRATE} from 'redux-persist/constants';
import globalThemes from 'components/organisms/GlobalPictureNavTabs/data';
import spotlightUgandaThemes from 'components/organisms/SpotLightNavTabs/ug-data';
import {GLOBAL_INDICATOR, SPOTLIGHT_INDICATOR} from './actions';

// would have been to use & operator but it wasnt working
export type Action = {
  globalIndicator: string,
  spotlightIndicator: string,
  type: string,
  payload: {
    apollo: any
  }
}
export type AppState = {
  rehydrated: boolean,
  isFirstMapRender: boolean,
  spotlightIndicator: string,
  globalIndicator: string,
}
export type State = {
  app: AppState,
  apollo: Store // from apollo client flow type definition
}
type Reducer<S, A> = (state: S, action: A) => S;

export type AppReducers <S, A> = {
  app: Reducer<S, A>
}
export const initialState: AppState = {
  rehydrated: false,
  isFirstMapRender: true,
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
        return {...state, globalIndicator: action.globalIndicator, isFirstMapRender: false};
      }
      case SPOTLIGHT_INDICATOR: {
        return {...state, spotlightIndicator: action.spotlightIndicator, isFirstMapRender: false};
      }
      default: return state;
    }
  }
};

export const apolloWrapper = (apolloReducer: Reducer<Store, Action>) =>
  (state: Store, action: Action) => {
    switch (action.type) {
      case REHYDRATE: {
        if (action && action.payload && action.payload.apollo) {
          return {...state, ...action.payload.apollo};
        }
        return state;
      }
      default: return apolloReducer(state, action);
    }
  };
