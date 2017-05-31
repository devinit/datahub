import {REHYDRATE} from 'redux-persist/constants';

const inititial = {
  rehydrated: false
};

export const app = {
  app: (state = inititial, { type, payload }) => {
    switch (type) {
      case REHYDRATE: {
        return {...state, rehydrated: true};
      }
      default: return state;
    }
  }
};

export const apolloWrapper = (apolloReducer) => (state, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return {...state, ...action.payload.apollo};
    }
    default: return apolloReducer(state, action);
  }
};
