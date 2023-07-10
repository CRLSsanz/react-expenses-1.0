const filterReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "FILTER_BY_AGE":
      return { ...state, byAge: action.payload };
    case "FILTER_BY_MONTH":
      return { ...state, byMonth: action.payload };
    case "FILTER_BY_CONTROL":
      return { ...state, byControl: action.payload };
    default:
      return state;
  }
};

export const filterReducerMovim = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "FILTER_BY_AGE":
      return { ...state, byAge: action.payload };
    case "FILTER_BY_MONTH":
      return { ...state, byMonth: action.payload };
    case "FILTER_BY_CONTROL":
      return { ...state, byControl: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
