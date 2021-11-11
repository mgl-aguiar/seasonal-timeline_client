export const selectAllProduces = (reduxState) => {
  return reduxState.produce.allProduces;
};

export const selectProduceDetails = (reduxState) => {
  return reduxState.produce.produceDetails;
};

export const selectProducerProfile = (reduxState) => {
  return reduxState.produce.producerProfile;
};

export const selectFilterState = (reduxState) => {
  return reduxState.produce.filterState;
};
