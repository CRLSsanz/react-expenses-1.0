import React, { createContext, useContext, useEffect, useReducer } from "react";
import { TYPES, controlReducer } from "../reducers/controlReducer";
import filterReducer, { filterReducerMovim } from "../reducers/filterReducer";
import axios from "axios";
//5
const initialState = {
  transaction: [],
  category: [],
  acount: [],
  /*db: [
    {
      category: "Cine",
      comment: "Pelicula en cinemark Death note en megaplaza",
      date: "2023-05-10",
      total: 80,
      type: "Expense",
      account: "Tarjeta de credito",
    },
    {
      category: "Cliente",
      comment: "recibo por honorarios",
      date: "2023-05-15",
      total: 550,
      type: "Income",
      account: "Efectivo",
    },
    {
      category: "Alimentos y bebidas",
      comment: "Compras de frutas",
      date: "2023-06-21",
      total: 55,
      type: "Expense",
      account: "Efectivo",
    },
    {
      category: "Automovil",
      comment: "Gasolina",
      date: "2023-06-20",
      total: 100,
      type: "Expense",
      account: "Tarjeta de credito",
    },
    {
      category: "Bebe",
      comment: "Juguetes y accesorios",
      date: "2023-06-17",
      total: 30,
      type: "Expense",
      account: "Cuenta bancaria",
    },
    {
      category: "Belleza e higiene",
      comment: "peluqueria",
      date: "2023-06-15",
      total: 75,
      type: "Expense",
      account: "Cuenta bancaria",
    },
    {
      category: "Negocios",
      comment: "ingreso mensual",
      date: "2023-06-15",
      total: 700,
      type: "Income",
      account: "Cuenta Bancaria",
    },
    {
      category: "Casa o vivienda",
      comment: "Mueble para la tv",
      date: "2023-06-14",
      total: 450,
      type: "Expense",
      account: "Tarjeta de credito",
    },
    {
      category: "Alquiler",
      comment: "Mensualidad de departamento",
      date: "2023-06-14",
      total: 250,
      type: "Income",
      account: "Caja fuerte",
    },
    {
      category: "Regalos",
      comment: "Cumpleanos de sobrino",
      date: "2023-07-19",
      total: 135,
      type: "Expense",
      account: "Efectivo",
    },
    {
      category: "Cliente",
      comment: "cliente",
      date: "2023-07-12",
      total: 80,
      type: "Income",
      account: "Efectivo",
    },
    {
      category: "Vacaciones",
      comment: "Paseo al centro recreacional con piscina",
      date: "2023-07-08",
      total: 180,
      type: "Expense",
      account: "Tarjeta de credito",
    },
    {
      category: "Salario",
      comment: "ingreso mensual",
      date: "2023-07-02",
      total: 1350,
      type: "Income",
      account: "Cuenta Bancaria",
    },
    {
      category: "Servicios",
      comment: "Reparacion de pc",
      date: "2023-07-01",
      total: 50,
      type: "Income",
      account: "Efectivo",
    },

    {
      category: "Otros gastos",
      comment: "Divercion con amigos discoteka",
      date: "2023-08-23",
      total: 50,
      type: "Expense",
      account: "Efectivo",
    },
    {
      category: "Regalo",
      comment: "Regalo de cumpleaòos",
      date: "2023-08-21",
      total: 730,
      type: "Income",
      account: "Efectivo",
    },
    {
      category: "Transporte",
      comment: "pasaje",
      date: "2023-08-20",
      total: 20,
      type: "Expense",
      account: "Efectivo",
    },
    {
      category: "Otros ingresos",
      comment: "otro ingreso",
      date: "2023-08-19",
      total: 90,
      type: "Income",
      account: "Efectivo",
    },

    {
      category: "Salud",
      comment: "Inyeccion",
      date: "2023-08-12",
      total: 15,
      type: "Expense",
      account: "Efectivo",
    },
    {
      category: "Ropa y calzado",
      comment: "zapatillas",
      date: "2023-08-05",
      total: 130,
      type: "Expense",
      account: "Efectivo",
    },
    {
      category: "Restaurante",
      comment: "kfc",
      date: "2023-08-04",
      total: 40,
      type: "Expense",
      account: "Efectivo",
    },
    {
      category: "Equipos electronicos",
      comment: "ventiladora",
      date: "2023-09-07",
      total: 120,
      type: "Expense",
      account: "Efectivo",
    },

    {
      category: "Cliente",
      comment: "cliente",
      date: "2023-09-06",
      total: 70,
      type: "Income",
      account: "Efectivo",
    },
    {
      category: "Estudios formacion",
      comment: "Libros",
      date: "2023-09-04",
      total: 40,
      type: "Expense",
      account: "Efectivo",
    },

    {
      category: "Facturas y pagos",
      comment: "luz",
      date: "2023-09-03",
      total: 85,
      type: "Expense",
      account: "Efectivo",
    },

    {
      category: "Mascota",
      comment: "Comida",
      date: "2023-09-01",
      total: 20,
      type: "Expense",
      account: "Efectivo",
    },
  ],*/
};

//2 EJECUTAR LOS DATOS Y COMPARTIR
const AppContext = createContext();

//6 CREAMOS EL HOOK PARA USARLO
const useAppContext = () => {
  return useContext(AppContext);
};

//1
const AppProvider = ({ children }) => {
  //4 CREAR REDUCERS Y USAR EL CONTROLREDUCER CON INITIALSTATE
  const [state, dispatch] = useReducer(controlReducer, initialState);

  // 7777 web: https://www.freecodecamp.org/espanol/news/como-formatear-fechas-en-javascript-con-una-linea-de-codigo/
  const hoy = new Date().toISOString();
  const age = hoy.substr(0, 4);
  const month = hoy.substr(5, 2);

  // 7777 REDUCER PARA FILTRAR
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byAge: age,
    byMonth: month,
    byControl: "",
    byAccount: "",
    searchQuery: "",
  });

  const [filterStateMovim, filterDispatchMovim] = useReducer(
    filterReducerMovim,
    {
      byAge: age,
      byMonth: month,
    }
  );

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    const response = await fetch(
      "https://enthusiastic-pear-peplum.cyclic.app/api/transaction"
    );
    const json = await response.json();
    //console.log(json);
    dispatch({ type: TYPES.TRA_LIST, payload: json });
  };

  const transactionCreate = (form) => {
    axios
      .post(
        `https://enthusiastic-pear-peplum.cyclic.app/api/transaction/`,
        form
      )
      .then(function (response) {
        dispatch({ type: TYPES.TRA_CREATE, payload: response.data });
        /*toast.info("Details create successfully", {
        //theme: "light",
        theme: "colored",
      });*/
        //navigate(-1); //direccion con router
        getTransaction();
      });
  };
  const transactionDelete = (id) => {
    let isDelete = window.confirm(
      `Estas seguro de eliminar la transaccion con el id: ${id} ?`
    );
    if (isDelete) {
      axios
        .delete(
          `https://enthusiastic-pear-peplum.cyclic.app/api/transaction/${id}`
        )
        .then(function (response) {
          dispatch({ type: TYPES.DELETE_CREATE, payload: response.data });
          /*toast.info("Details create successfully", {
        //theme: "light",
        theme: "colored",
      });*/
          //navigate(-1); //direccion con router
          getTransaction();
        });
    }
  };

  return (
    <AppContext.Provider
      value={{
        //datos: state.db,
        datos: state.transaction,
        category: state.category,
        dispatch,
        filterState,
        filterDispatch,
        filterStateMovim,
        filterDispatchMovim,
        transactionCreate,
        transactionDelete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 3 NO POR DEFECTO POR QUE VMAOS A EXPORTAR VARIAS COSAS
// PRIMER0 APPPROVIDER
// SEGUNDO USEAPPCONTEXT
export { AppProvider, useAppContext };
