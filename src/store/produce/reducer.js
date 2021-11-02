const initialState = {
  allProduces: [],
};

export default function produceReducer(state = initialState, action) {
  switch (action.type) {
    case "produces/loadAllProduces": {
      console.log("all produces: ", action.payload);
      return {
        ...state,
        allProduces: [...action.payload],
      };
    }

    case "produces/loadCountryProduces": {
      console.log("from reducer: ", action.payload);
      return {
        ...state,
        allProduces: [...action.payload.produces],
      };
    }

    default: {
      return state;
    }
  }
}
