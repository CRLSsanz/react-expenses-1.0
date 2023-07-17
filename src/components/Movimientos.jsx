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
      <div className="bg-[#202940] text-gray-200 p-4 rounded-md mx-2 mb-4">
        <div className="bg-[#8F3C9F] p-4 rounded-md -mt-8">
          <div className="flex justify-between mb-2">
            <h1 className="col-span-2 text-gray-100">Transacciones por mes</h1>
            <select
              onChange={(e) =>
                filterDispatchMovim({
                  type: "FILTER_BY_AGE",
                  payload: e.target.value,
                })
              }
              defaultValue={age}
              className="focus:outline-none font-numero bg-transparent"
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <select
            defaultValue={month}
            onChange={(e) =>
              filterDispatchMovim({
                type: "FILTER_BY_MONTH",
                payload: e.target.value,
              })
            }
            className="w-full rounded-md focus:outline-none bg-transparent border border-purple-300 px-3 py-2"
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
        </div>
        <div className="grid grid-cols-2 mt-3 px-4">
          <div className="mr-2 py-1">
            <h1>
              Gastos{" "}
              <span className="text-red-400  font-numero">
                ${totalExpense()}
              </span>
            </h1>
          </div>
          <div className="border-b--4 border-blue--500 py-1 text-end">
            <h1>
              Ingresos{" "}
              <span className="text-blue-400 font-numero">
                ${totalIncome()}
              </span>
            </h1>
          </div>
          <div className="hidden col-span-2">
            {(totalExpense() * 100) / totalIncome() + "%"}
          </div>
          <div className="col-span-2 w-full bg-blue-500 rounded-bl-full rounded-tr-full h-3 mb-1">
            <div
              className="bg-red-400 h-3 rounded-bl-full rounded-tr-full "
              style={{
                width:
                  (totalExpense() * 100) / (totalIncome() + totalExpense()) +
                  "%",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/** LIST DATOS */}
      <div className="bg-[#202940] text-gray-200 rounded-md pt-4 px-1 ml-2 mr-2 mb-4">
        <div className="w-full h-[450px] grid grid-rows-3 grid-flow-col overflow-x-scroll ">
          {transformData().map((item, index) => (
            <div
              key={index}
              className="w-[135px] flex flex-col justify-center items-center mb-4"
            >
              <div
                className={`relative w-16 h-16 flex items-center justify-center rounded-full  border-4 ${
                  item.type === "Income"
                    ? "border-blue-200 bg-blue-100"
                    : "border-red-200 bg-red-100"
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
              <h4 className="truncate w-full text-center text-sm font-medium">
                {item.category}
              </h4>
              <h4
                className={`font-semibold font-numero ${
                  item.type === "Income" ? "text-blue-400" : "text-red-500"
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
