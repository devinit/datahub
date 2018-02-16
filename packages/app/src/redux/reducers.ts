// import {Dispatch, Store} from 'redux';
import globalThemes from '../components/organisms/NavBarTabs/data';
import spotlightUgandaThemes from '../components/organisms/NavBarTabs/uganda';
import spotlightKenyaThemes from '../components/organisms/NavBarTabs/kenya';
import { GLOBAL_INDICATOR, SPOTLIGHT_INDICATOR_UG, LOADING_STATUS, SPOTLIGHT_INDICATOR_KE } from './actions';

// would have been to use & operator but it wasnt working
export interface AppState {
  loading: boolean;
  indicatorUganda: string;
  indicatorKenya: string;
  globalIndicator: string;
}

export type Action = AppState & {
  type: string,
  payload: {
    apollo: any,
  },
};

export interface State {
    app: AppState;
}

type Reducer<S, A> = (state: S, action: A) => S;

export interface AppReducers {
    app: Reducer<AppState, Action>;
}

export const initialState: AppState = {
  loading: true,
  indicatorUganda: spotlightUgandaThemes.spotlightThemes[0].default_indicator,
  indicatorKenya: spotlightKenyaThemes.spotlightThemes[0].default_indicator,
  globalIndicator: globalThemes.globalPictureThemes[0].default_indicator,
};

export const app: AppReducers = {
  app: (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {
      case LOADING_STATUS: {
        return { ...state, loading: action.loading };
      }
      case GLOBAL_INDICATOR: {
        return { ...state, globalIndicator: action.globalIndicator};
      }
      case SPOTLIGHT_INDICATOR_UG: {
        return { ...state, indicatorUganda: action.indicatorUganda };
      }
      case SPOTLIGHT_INDICATOR_KE: {
        return { ...state, indicatorKenya: action.indicatorKenya};
      }
      default:
        return state;
    }
  },
};
