const filterReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "FILTER_BY_YEAR":
      return { ...state, byYear: action.payload };
    case "FILTER_BY_MONTH":
      return { ...state, byMonth: action.payload };
    case "FILTER_BY_CONTROL":
      return { ...state, byControl: action.payload };
    default:
      return state;
  }
};

export const filterTransactionReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "FILTER_BY_YEAR":
      return { ...state, byYear: action.payload };
    case "FILTER_BY_MONTH":
      return { ...state, byMonth: action.payload };
    case "FILTER_BY_CONTROL":
      return { ...state, byControl: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
