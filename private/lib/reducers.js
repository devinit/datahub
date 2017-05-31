const inititial = {
  rehydrated: false
};

export default {
  app: (state = inititial, { type, payload }) => {
    switch (type) {
      case 'EXAMPLE_ACTION': {
        return {
          ...state
        };
      }
      default: return state;
    }
  }
};
