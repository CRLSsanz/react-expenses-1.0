const controlReducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case "LIST_BY_CATEGORY":
      const findCategory = state.db.find((item) => item.category === "Compras");
      //console.log(findCategory);

      return findCategory
        ? {
            ...state,
          }
        : {
            ...state,
            category: [...state.db],
          };

    default:
      return state;
  }
};

/*export const filterReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "FILTER_BY_AGE":
      return { ...state, byAge: action.payload };
    case "FILTER_BY_MONTH":
      return { ...state, byMonth: action.payload };
    default:
      return { ...state };
  }
}; */

export default controlReducer;
