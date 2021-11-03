export const selectAllProduces = (reduxState) => {
  return reduxState.produce.allProduces;
};

// const produce = reduxState.produce.allProduces;

// console.log("from selector: ", produce.length);

// if (produce) {
//   function sortBySeasonStart(produceA, produceB) {
//     return produceA.seasonStart - produceB.seasonStart;
//   }

//   const sortedProduces = [...produce].sort(sortBySeasonStart);

//   return { ...reduxState.produce, allProduces: sortedProduces };
// } else {
//   return reduxState.produce.allProduces;
// }
