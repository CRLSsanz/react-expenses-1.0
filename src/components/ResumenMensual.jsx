import React, { useState } from "react";
import { FaMinus, FaPlus, FaEquals } from "react-icons/fa";
import { TiFilter } from "react-icons/ti";
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
  const [showFilter, setShowFilter] = useState(false);

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
        return (c = " " + val + "-blue-500 ");
      }
    });
    return c;
  };
  const handelOnClose = (e) => {
    //onClose();
    if (e.target.id === "container") setShowFilter(false);
  };

  return (
    <div>
      <div className="bg-[#202940] relative text-gray-200 p-4 rounded-md mx-2 mb-8">
        <h1 className="text-lg mb-2">Balance General</h1>
        {/** BOTON FILTRO */}
        <div
          className="bg-[#29345277] absolute bottom-0 -right-4 p-2"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <TiFilter className="text-xl" />
        </div>
        {/** CONTENIDO FILTRER */}
        <div
          id="container"
          onClick={handelOnClose}
          className={`fixed z-20 top-16 right-10 w-[calc(100vw-56px)] h-[calc(100vh-80px)]   
          
          ${
            showFilter
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } 
          `}
        >
          {" "}
        </div>

        <div className="flex justify-end">
          <div
            className={`bg-gray-500 p-6 rounded-lg w-full ml-4 grid grid-cols-2 gap-4`}
          >
            <h1 className="col-span-2">Sidebars Filters</h1>
            <select
              defaultValue={month}
              onChange={(e) =>
                filterDispatch({
                  type: "FILTER_BY_MONTH",
                  payload: e.target.value,
                })
              }
              className="focus:outline-none text-sm bg-[#293452] p-2 px-3 rounded-md"
            >
              <option value="">Todos los meses</option>
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
              className="focus:outline-none text-sm bg-[#293452] p-2 px-3 rounded-md font-numero"
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
              className="col-span-2 focus:outline-none text-sm bg-[#293452] p-2 px-3 rounded-md"
            >
              <option value="">Todas las transacciones</option>
              <option value="Income">Ingresos</option>
              <option value="Expense">Gastos</option>
            </select>

            <select
              onChange={(e) => ""}
              defaultValue={""}
              className="col-span-2 focus:outline-none text-sm bg-[#293452] p-2 px-3 rounded-md"
            >
              <option value="">Todas las cuentas</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Cuenta Bancaria">Cuenta Bancaria</option>
              <option value="Tarjeta de credito">Tarjeta de credito</option>
              <option value="Caja fuerte">Caja fuerte</option>
              <option value="Otro">Otro</option>
            </select>

            <div className="col-span-2 w-full flex justify-end pt-8">
              <svg
                onClick={() => setShowFilter(false)}
                width="25px"
                viewBox="0 0 24 24"
                //fill="#aaa"
                fill="#ddd"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" />
              </svg>
            </div>
          </div>
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

      <div className="bg-[#202940] text-gray-200 p-4 rounded-md mx-2 mb-4">
        <div className="bg-[#339464] p-4 rounded-md -mt-8">
          <h1 className="text-gray-100">
            Resumen por categoria ({Object.entries(resultado2).length})
          </h1>
          <p className="text-sm text-gray-300">
            Lista de {byControl === "" ? " transacciones" : byControl} de{" "}
            {byMonth === "" ? "todos los meses" : meses[Number(byMonth) - 1]}{" "}
            del {byAge}
          </p>
        </div>

        <div className="lg:max-h-[calc(100vh-450px)] lg:overflow-y-scroll pt-4">
          {Object.entries(resultado2)
            .sort()
            .map(([key, value]) => (
              <div key={key} className="flex mb-4">
                <img
                  className="bg-white border-2 rounded-full mr-3 "
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
