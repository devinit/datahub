// @flow
import globalThemes from 'components/organisms/NavBarTabs/data';
import spotlightUgandaThemes from 'components/organisms/NavBarTabs/ug-data';
import { GLOBAL_INDICATOR, SPOTLIGHT_INDICATOR, LOADING_STATUS } from './actions';

// would have been to use & operator but it wasnt working
export type AppState = {
  loading: boolean,
  spotlightIndicator: string,
  globalIndicator: string,
};

export type Action = {
  ...AppState,
  type: string,
  payload: {
    apollo: any,
  },
};

export type State = {
  app: AppState,
  apollo: Store, // from apollo client flow type definition
};

type Reducer<S, A> = (state: S, action: A) => S;

export type AppReducers<S, A> = {
  app: Reducer<S, A>,
};
export const initialState: AppState = {
  loading: true,
  spotlightIndicator: spotlightUgandaThemes.spotlightThemes[0].default_indicator,
  globalIndicator: globalThemes.globalPictureThemes[0].default_indicator,
};

export const app: AppReducers<AppState, Action> = {
  app: (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {
      case LOADING_STATUS: {
        return { ...state, loading: action.loading };
      }
      case GLOBAL_INDICATOR: {
        return { ...state, globalIndicator: action.globalIndicator, isFirstMapRender: false };
      }
      case SPOTLIGHT_INDICATOR: {
        return { ...state, spotlightIndicator: action.spotlightIndicator, isFirstMapRender: false };
      }
      default:
        return state;
    }
  },
};
