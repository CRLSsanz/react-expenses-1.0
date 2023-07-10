import React from "react";
import { FaMinus, FaPlus, FaEquals } from "react-icons/fa";
import { useAppContext } from "../context/AppProvider";
const cargarImagen = require.context("../images", true);

const incomeCategory = [
  "Alquiler",
  "Cliente",
  "Negocios",
  "Regalo",
  "Salario",
  "Servicios",
  "Otros ingresos",
];

const ResumenMensual = () => {
  const { datos, filterState, filterDispatch } = useAppContext();

  //FECHA PARA FILTERS
  const hoy = new Date().toISOString();
  const age = hoy.substr(0, 4);
  const month = hoy.substr(5, 2);
  const { byAge, byMonth, byControl } = filterState;

  const filterTransformData = () => {
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

    if (byControl) {
      data = data.filter((item) => item.type === byControl);
    }

    return data;
  };

  const resultado2 = filterTransformData().reduce(
    (prev, cur) => (
      (prev[cur.category] = prev[cur.category] + cur.total || cur.total), prev
    ),
    {}
  );

  const valorMax = () => {
    let max3 = Object.entries(resultado2).map(([val1, val2]) => (val2 = val2));
    return Math.max(...max3);
  };
  const totalExpense = () => {
    let total = 0;
    {
      filterTransformData().forEach(function (value) {
        if (value.type === "Expense") total += value.total;
      });
    }
    return total;
  };
  const totalIncome = () => {
    let total = 0;
    {
      filterTransformData().forEach(function (value) {
        if (value.type === "Income") total += value.total;
      });
    }

    return total;
  };
  const color = (key, val) => {
    let c = " " + val + "-red-500 ";
    incomeCategory.map((item) => {
      //console.log(item + " - " + key);
      if (item === key) {
        //console.log(item + " - " + key);
        return (c = " " + val + "-blue-500 ");
      }
    });
    return c;
  };

  return (
    <div className="">
      <div className="bg-gray-50 shadow-md text-gray-700 border-l-4 border-purple-600 rounded-lg p-4 mb-2">
        <h1 className="font-semibold">Balance General</h1>
        <div className="w-full flex justify-center">
          <select
            onChange={(e) => ""}
            defaultValue={""}
            className="hidden focus:outline-none appearance-none font-numero bg-transparent border p-2 mb-2"
          >
            <option value="">Cuentas</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Cuenta Bancaria">Cuenta Bancaria</option>
            <option value="Tarjeta de credito">Tarjeta de credito</option>
            <option value="Caja fuerte">Caja fuerte</option>
            <option value="Otro">Otro</option>
          </select>

          <select
            onChange={(e) =>
              filterDispatch({
                type: "FILTER_BY_CONTROL",
                payload: e.target.value,
              })
            }
            defaultValue={""}
            className="focus:outline-none appearance-none bg-transparent border p-2 mb-2"
          >
            <option value="">Control</option>
            <option value="Income">Ingresos</option>
            <option value="Expense">Gastos</option>
          </select>

          <select
            defaultValue={month}
            onChange={(e) =>
              filterDispatch({
                type: "FILTER_BY_MONTH",
                payload: e.target.value,
              })
            }
            className="focus:outline-none appearance-none bg-transparent border p-2 mb-2 "
          >
            <option value="">Meses</option>
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
              filterDispatch({ type: "FILTER_BY_AGE", payload: e.target.value })
            }
            defaultValue={age}
            className="focus:outline-none appearance-none font-numero bg-transparent border p-2 mb-2"
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <p className="hidden text-gray-400">Julio, 2023</p>
        <div className="grid grid-cols-5 font-numero text-right px-8">
          <h1 className="col-span-2">Ingreso : </h1>
          <h1 className="col-span-3 flex flex-row justify-end items-center">
            {totalIncome()}.00 <FaPlus className="ml-1 text-sm text-blue-500" />
          </h1>
          <h1 className="col-span-2">Gasto : </h1>
          <h1 className="col-span-3 flex flex-row justify-end items-center">
            {totalExpense()}.00{" "}
            <FaMinus className="ml-1 text-sm text-red-500" />
          </h1>
          <h1 className="col-span-2">Saldo : </h1>
          <h1 className="col-span-3 flex flex-row justify-end items-center text-green-600">
            S/. {totalIncome() - totalExpense()}.00{" "}
            <FaEquals className="ml-1 text-sm text-gray-500" />{" "}
          </h1>
        </div>
      </div>
      <div className="bg-gray-50 shadow-md text-gray-700 border-l-4 border-purple-600 rounded-lg p-4 mb-2">
        <h1 className="font-semibold mb-2">Resumen por categoria</h1>
        <p className="hidden text-gray-400">Julio, 2023</p>
        <div className="px-4">
          {Object.entries(resultado2)
            .sort()
            .map(([key, value]) => (
              <div key={key} className="flex mb-3">
                <img
                  className="rounded-sm inline-block mr-3 "
                  src={cargarImagen(`./${key}.png`)}
                  style={{ width: "30px", height: "30px" }}
                  alt={key}
                />
                <div className="w-full flex flex-col">
                  <div className="flex flex-row justify-between">
                    <div className="tracking-wider ">{key}</div>
                    <div
                      className={`${color(
                        key,
                        "textt"
                      )} text-gray-400 font-medium font-numero`}
                    >
                      {value}.00 $
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gray-200">
                    <div
                      className={`w-full h-1 ${color(key, "bg")}`}
                      style={{
                        width: (value * 100) / valorMax() + "%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="hidden"> {JSON.stringify(resultado2)} </div>
      </div>
    </div>
  );
};

export default ResumenMensual;
