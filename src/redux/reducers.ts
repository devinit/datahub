import { AnyAction} from 'redux';
import globalThemes from '../components/organisms/NavBarTabs/data';
import spotlightUgandaThemes from '../components/organisms/NavBarTabs/uganda';
import spotlightKenyaThemes from '../components/organisms/NavBarTabs/kenya';
import { GLOBAL_INDICATOR, SPOTLIGHT_INDICATOR_UG, LOADING_STATUS, SPOTLIGHT_INDICATOR_KE } from './actions';

export interface AppState {
  loading: boolean;
  indicatorUganda: string;
  indicatorKenya: string;
  globalIndicator: string;
}

export interface State {
    app: AppState;
}

export const initialState: AppState = {
  loading: true,
  indicatorUganda: spotlightUgandaThemes.spotlightThemes[0].default_indicator,
  indicatorKenya: spotlightKenyaThemes.spotlightThemes[0].default_indicator,
  globalIndicator: globalThemes.globalPictureThemes[0].default_indicator,
};

// TODO: Redux types error, reducer type should have a Param for action
export const app = (state: AppState = initialState, action: AnyAction): AppState => {
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
};
