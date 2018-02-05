// @flow
import globalThemes from 'components/organisms/NavBarTabs/data';
import spotlightUgandaThemes from 'components/organisms/NavBarTabs/uganda';
import spotlightKenyaThemes from 'components/organisms/NavBarTabs/kenya';
import { GLOBAL_INDICATOR, SPOTLIGHT_INDICATOR_UG, LOADING_STATUS, SPOTLIGHT_INDICATOR_KE } from './actions';

// would have been to use & operator but it wasnt working
export interface AppState  {
  loading: boolean;
  indicatorUganda: string;
  indicatorKenya: string;
  globalIndicator: string;
}

export interface Action  {
  ...AppState;
  type: string;
  payload: {
    apollo: any;
  };
}

export interface State  {
  app: AppState;
  apollo: Store; // from apollo client flow type definition
}

interface Reducer<S, A> = (state: S, action: A) => S;

export interface AppReducers<S, A>  {
  app: Reducer<S, A>;
}
export const initialState: AppState = {
  loading: true,
  indicatorUganda: spotlightUgandaThemes.spotlightThemes[0].default_indicator,
  indicatorKenya: spotlightKenyaThemes.spotlightThemes[0].default_indicator,
  globalIndicator: globalThemes.globalPictureThemes[0].default_indicator,
};

export const app: AppReducers<AppState, Action> = {
  app: (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {
      case LOADING_STATUS: {
        return { ...state, loading: action.loading };
      }
      case GLOBAL_INDICATOR: {
        return { ...state, globalIndicator: action.globalIndicator};
      }
      case SPOTLIGHT_INDICATOR_UG: {
        console.log('reducer ug: ', action);
        return { ...state, indicatorUganda: action.indicatorUganda };
      }
      case SPOTLIGHT_INDICATOR_KE: {
        console.log('reducer ke: ', action);
        return { ...state, indicatorKenya: action.indicatorKenya};
      }
      default:
        return state;
    }
  },
};
