import React from "react";
import { useAppContext } from "../context/AppProvider";
const cargarImagen = require.context("../images", true);

const Movimientos = () => {
  const { datos, filterStateMovim, filterDispatchMovim } = useAppContext();

  //web: https://www.freecodecamp.org/espanol/news/como-formatear-fechas-en-javascript-con-una-linea-de-codigo/
  const hoy = new Date().toISOString();
  const age = hoy.substr(0, 4);
  const month = hoy.substr(5, 2);

  const { byAge, byMonth } = filterStateMovim;

  const totalExpense = () => {
    let total = 0;
    {
      transformData().forEach(function (value) {
        if (value.type === "Expense") total += value.total;
      });
    }
    return total;
  };
  const totalIncome = () => {
    let total = 0;
    {
      transformData().forEach(function (value) {
        if (value.type === "Income") total += value.total;
      });
    }

    return total;
  };

  const transformData = () => {
    let data = datos;

    if (byAge) {
      data = data.filter(
        (item) => item.date >= `${byAge}-01-01` && item.date <= `${byAge}-12-31`
      );
    }

    if (byMonth) {
      data = data.filter(
        (item) =>
          item.date >= `${byAge}-${byMonth}-01` &&
          item.date <= `${byAge}-${byMonth}-31`
      );
    }

    return data;
  };

  return (
    <div className="">
      <div className="bg-black text-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-2">
          <h1 className="col-span-2 font-semibold mb-2">
            Transacciones por mes
          </h1>
          <select
            defaultValue={month}
            onChange={(e) =>
              filterDispatchMovim({
                type: "FILTER_BY_MONTH",
                payload: e.target.value,
              })
            }
            className="focus:outline-none appearance-none bg-transparent border p-2 mr-2 mb-2 "
          >
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
          <select
            onChange={(e) =>
              filterDispatchMovim({
                type: "FILTER_BY_AGE",
                payload: e.target.value,
              })
            }
            defaultValue={age}
            className="focus:outline-none appearance-none font-numero bg-transparent border p-2 mb-2"
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>

          <div className="mr-2 py-1">
            <h1>
              Gastos{" "}
              <span className="text-red-500  font-numero">
                ${totalExpense()}
              </span>
            </h1>
          </div>
          <div className="border-b--4 border-blue--500 py-1 text-end">
            <h1>
              Ingreso{" "}
              <span className="text-blue-500 font-numero">
                ${totalIncome()}
              </span>
            </h1>
          </div>
          <div className="hidden col-span-2">
            {(totalExpense() * 100) / totalIncome() + "%"}
          </div>
          <div className="col-span-2 w-full bg-blue-500 rounded-full h-1.5 mb-4 dark:bg-gray-700">
            <div
              className="bg-red-500 h-1.5 rounded-l-full"
              style={{
                width:
                  (totalExpense() * 100) / (totalIncome() + totalExpense()) +
                  "%",
              }}
            ></div>
          </div>
        </div>
      </div>
      {/** LIST DATOS * /}
      <div className="bg-white text-gray-700 border-l-4 border-purple-600 shadow-md rounded-lg p-4">
        <div className="max-h-[calc(100vh-170px)] overflow-y-scroll overflow-x-hidden">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-center items-center mb-5 "
            >
              <img
                className="rounded-full w-10 h-10 border-2 border-gray-300"
                src={cargarImagen(`./${item.category}.jpg`)}
                alt={item.category}
              />
              <div
                className={`w-full grid grid-cols-2 px-2 rounded-sm border-r-4 ${
                  item.type === "Income" ? "border-blue-500" : "border-red-500"
                } `}
              >
                <h1>{item.category}</h1>
                <h1
                  className={`font-numero text-right font-light  ${
                    item.type === "Income" ? "text-green-600" : ""
                  }`}
                >
                  $ {item.total}.00
                </h1>
                <h4 className="text-xs text-gray-400">Efectivo</h4>
                <h4 className="text-xs text-gray-400 font-numero text-right">
                  {item.date.substr(0, 10)}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden gridd grid-cols-2">
          <h1>
            Ingresos: <span className="text-green-500">$ 2550</span>
          </h1>
          <h1 className="text-right">
            Gastos: <span className="text-red-500">$ 1300</span>
          </h1>
        </div>
      </div>
      
      {/** LIST DATOS */}
      <div className="bg-[#222] text-gray-200 border-2 border-purple-900 rounded-lg pt-4 ml-2 mr-4 shadow-lg shadow-gray-500">
        <div className="w-full h-[450px] grid grid-rows-3 grid-flow-col overflow-scroll">
          {transformData().map((item, index) => (
            <div
              key={index}
              className="w-[135px] flex flex-col justify-center items-center mb-4"
            >
              <div
                className={`relative w-16 h-16 flex items-center justify-center rounded-full  border-4 ${
                  item.type === "Income"
                    ? "border-blue-800 bg-blue-300"
                    : "border-red-800 bg-gray-300"
                } `}
              >
                <img
                  className=" absolute rounded-sm"
                  src={cargarImagen(`./${item.category}.png`)}
                  style={{ width: "40px" }}
                  alt={item.category}
                />
                <img
                  className=" absolute -bottom-1 -left-5 "
                  src={cargarImagen(`./Calendar.png`)}
                  style={{ width: "30px" }}
                  alt="Calendar"
                />
                <h1 className="absolute bottom-0 -left-3 text-white font-semibold text-xs flex items-center justify-center font-numero">
                  {item.date.substr(8, 2)}
                </h1>
              </div>
              <h4 className="truncate w-full text-center text-sm font-semibold">
                {item.category}
              </h4>
              <h4
                className={`font-medium font-numero ${
                  item.type === "Income" ? "text-blue-600" : "text-red-600"
                } `}
              >
                ${item.total}
              </h4>
              <h4 className="text-xs text-gray-400 italic">{item.account}</h4>
            </div>
          ))}
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Movimientos;
