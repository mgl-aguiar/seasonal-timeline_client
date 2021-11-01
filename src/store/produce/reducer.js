const initialState = {
  allProduces: [],
};

export default function produceReducer(state = initialState, action) {
  switch (action.type) {
    case "produces/loadAllProduces": {
      return {
        ...state,
        allProduces: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
}
