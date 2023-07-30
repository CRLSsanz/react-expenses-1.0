import React, { createContext, useContext, useReducer } from "react";
import controlReducer from "../reducers/controlReducer";
import filterReducer, { filterReducerMovim } from "../reducers/filterReducer";

//5
const initialState = {
  db: [
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
      comment: "cumpleòaos de sobrino",
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
      category: "Cine",
      comment: "Death note en mega",
      date: "2023-07-10",
      total: 80,
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
      date: "2023-08-10",
      total: 130,
      type: "Expense",
      account: "Efectivo",
    },
    {
      category: "Restaurante",
      comment: "kfc",
      date: "2023-08-09",
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
  ],
  category: [],
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

  return (
    <AppContext.Provider
      value={{
        datos: state.db,
        category: state.category,
        dispatch,
        filterState,
        filterDispatch,
        filterStateMovim,
        filterDispatchMovim,
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
