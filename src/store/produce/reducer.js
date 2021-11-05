const initialState = {
  allProduces: [],
  produceDetails: [],
  producerProfile: [],
};

export default function produceReducer(state = initialState, action) {
  switch (action.type) {
    case "produces/loadAllProduces": {
      return {
        ...state,
        allProduces: [...action.payload],
      };
    }

    case "produces/loadCountryProduces": {
      return {
        ...state,
        allProduces: [...action.payload.produces],
      };
    }

    case "produces/loadProduceDetails": {
      return {
        ...state,
        produceDetails: action.payload,
      };
    }

    case "produces/loadProducerProfile": {
      return {
        ...state,
        producerProfile: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
