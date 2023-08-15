const TYPES = {
  TRA_LIST: "Transaction - lista",
  TRA_CREATE: "Transaction - Crear nuevo",
  TRA_DELETE: "Transaction - Delete",
  //
  TRA_NEW: "Detail - limpiar inputs del formulario",
  TRA_EDIT: "Deatils - mostrar el detalle para editar",
  TRA_UPDATE: "Deatils - actualizar",
};

const controlReducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case TYPES.TRA_LIST: {
      return {
        ...state,
        transaction: action.payload.map((data) => data),
      };
    }
  }

  switch (action.type) {
    case TYPES.TRA_CREATE: {
      return {
        ...state,
      };
    }
  }
  switch (action.type) {
    case TYPES.TRA_DELETE: {
      return {
        ...state,
      };
    }
  }

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

export { TYPES, controlReducer };
