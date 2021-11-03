export const selectAllProduces = (reduxState) => {
  return reduxState.produce.allProduces;
};

export const selectProduceDetails = (reduxState) => {
  return reduxState.produce.produceDetails;
};
