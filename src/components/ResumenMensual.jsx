import React from "react";
import { FaMinus, FaPlus, FaEquals } from "react-icons/fa";
import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";
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
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
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
  const totalExpenses = () => {
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
        return (c = " " + val + "-blue-300 ");
      }
    });
    return c;
  };

  return (
    <div className="">
      <div className="bg-[#202940] text-gray-200 p-4 rounded-md mx-2 mb-8">
        <h1 className="text-lg mb-2">Balance General</h1>
        <div className="w-full grid grid-cols-2 gap-2">
          <select
            defaultValue={month}
            onChange={(e) =>
              filterDispatch({
                type: "FILTER_BY_MONTH",
                payload: e.target.value,
              })
            }
            className="focus:outline-none text-sm bg-[#293452] p-1.5 px-3 rounded-md"
          >
            <option value="">All Months</option>
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
              filterDispatch({
                type: "FILTER_BY_AGE",
                payload: e.target.value,
              })
            }
            defaultValue={age}
            className="focus:outline-none text-sm bg-[#293452] p-1.5 px-3 rounded-md font-numero"
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>

          <select
            onChange={(e) =>
              filterDispatch({
                type: "FILTER_BY_CONTROL",
                payload: e.target.value,
              })
            }
            defaultValue={""}
            className="focus:outline-none text-sm bg-[#293452] p-1.5 px-3 rounded-md"
          >
            <option value="">Todas las transacciones</option>
            <option value="Income">Ingresos</option>
            <option value="Expense">Gastos</option>
          </select>

          <select
            onChange={(e) => ""}
            defaultValue={""}
            className="focus:outline-none text-sm bg-[#293452] p-1.5 px-3 rounded-md"
          >
            <option value="">Todas las cuentas</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Cuenta Bancaria">Cuenta Bancaria</option>
            <option value="Tarjeta de credito">Tarjeta de credito</option>
            <option value="Caja fuerte">Caja fuerte</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="bg-[#202940] text-gray-200 p-2 px-4 rounded-md mx-2 mb-8">
          <div className="relative text-right ">
            <div className="text-lg font-numero pb-2 border-b border-gray-700">
              ${totalIncome()}
            </div>
            <div className="flex justify-between">
              <h1 className="text-gray-400 text-left text-sm">Ingresos</h1>
              <h1 className="text-green-400 text-left text-sm font-numero">
                {totalIncome() > totalExpenses()
                  ? "$" + (totalIncome() - totalExpenses())
                  : ""}
              </h1>
            </div>
            <div className="absolute z-0 -top-6 bg-[#363b6b] rounded-md p-3">
              <GoArrowUpRight className="text-blue-400 text-2xl" />
            </div>
          </div>
        </div>
        <div className="bg-[#202940] text-gray-200 p-2 px-4 rounded-md mx-2 mb-8">
          <div className="relative text-right ">
            <div className="text-lg font-numero pb-2 border-b border-gray-700">
              ${totalExpenses()}
            </div>
            <h1 className="text-gray-400 text-left text-sm">Gastos</h1>
            <div className="absolute z-0 -top-6 bg-[#6e4558] rounded-md p-3">
              <GoArrowDownRight className="text-red-400 text-2xl" />
            </div>
          </div>
        </div>

        <div className="hidden bg-[#202940] text-gray-200 p-2 px-4 rounded-md mx-2 mb-8">
          <div className="flex justify-between items-end">
            <h1 className="text-lg font-numero">$1290.00</h1>
            <div className=" bg-[#322028] rounded-md p-2">
              <GoArrowDownRight className="text-red-500 text-lg" />
            </div>
          </div>
          <h2 className="text-sm text-gray-400 -mt-1">Gastos</h2>
        </div>
      </div>

      <div className="bg-[#202940] text-gray-200 p-4 rounded-md mx-2 mb-2">
        <div className="bg-[#8F3C9F] p-4 rounded-md -mt-8">
          <h1 className="text-gray-100">
            Resumen por categoria ({Object.entries(resultado2).length})
          </h1>
          <p className="text-sm text-gray-400">
            Lista de {byControl === "" ? " transacciones" : byControl} de{" "}
            {meses[Number(byMonth) - 1]}, {byAge}
          </p>
        </div>
        <div className="lg:max-h-[calc(100vh-350px)] lg:overflow-y-scroll pt-4">
          {Object.entries(resultado2)
            .sort()
            .map(([key, value]) => (
              <div key={key} className="flex mb-4">
                <img
                  className="rounded-sm inline-block mr-3 "
                  src={cargarImagen(`./${key}.png`)}
                  style={{ width: "30px", height: "30px" }}
                  alt={key}
                />
                <div className="w-full flex flex-col">
                  <div className="flex flex-row justify-between">
                    <div className="text-sm tracking-wide ">{key}</div>
                    <div
                      className={`${color(
                        key,
                        "textt"
                      )} text-gray-400 font-medium font-numero`}
                    >
                      {value}.00 $
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gray-700">
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
