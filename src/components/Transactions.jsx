import React from "react";
import Chart from "react-apexcharts";
import { PiWalletThin, PiShoppingCartSimpleLight } from "react-icons/pi";
import { useAppContext } from "../context/AppProvider";
const cargarImagen = require.context("../images", true);

const Transactions = () => {
  const { datos, filterStateMovim, filterDispatchMovim } = useAppContext();
  const { byAge, byMonth } = filterStateMovim;

  const hoy = new Date().toISOString();
  //console.log(hoy);
  const age = hoy.substr(0, 4);
  const month = hoy.substr(5, 2);
  const monthDay = hoy.substr(5, 5);

  const nombreDelDiaSegunFecha = (fecha) =>
    ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][
      new Date(fecha).getDay()
    ];

  const fechasParaProbar = [
    "2013-01-18 17:00:00",
    "2013-08-03 10:00:00",
    "1997-06-21 22:00:00",
  ];

  fechasParaProbar.forEach((fecha) => {
    //console.log(`En ${fecha} fue ${nombreDelDiaSegunFecha(fecha)}`);
  });

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
  const totalBalance = () => {
    //const balance;
    if (totalIncome() <= totalExpense()) return 0;
    const balance = ((totalIncome() - totalExpense()) * 100) / totalIncome();
    //console.log(balance.toFixed(0));
    return balance.toFixed(0);
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

  const options1 = {
    labels: ["Balance"],
    colors: ["#20E647"], //verde
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "50%", // grosor del circulo
          //background: "#5B21B6", // 6D28D9 fonfo gris oscuro
        },
        track: {
          //background: "#fff", // borde no lleno
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            //offsetY: -10, color: "#fff", fontSize: "13px",
            show: false,
          },
          value: {
            offsetY: 5, //elevar texto
            color: "#ddd",
            fontSize: "20px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
  };

  return (
    <div className="md:w-[600px] bg-gray-50 rounded-xl md:py-4 md:px-8">
      <div className=" px-4 pt-6 text-purple-700 flex items-center justify-between">
        <div className="text-xl ">Welcome back</div>
        <div className="px-2 bg-white shadow rounded-md">
          <select
            defaultValue={month}
            onChange={(e) =>
              filterDispatchMovim({
                type: "FILTER_BY_MONTH",
                payload: e.target.value,
              })
            }
            className="focus:outline-none appearance-none bg-white px-2 py-2"
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
          <h1 className="inline-block font-numero">2023</h1>
        </div>
      </div>
      {/* CHART */}
      <div className=" flex items-center md:justify-center">
        <Chart
          type="radialBar"
          options={options1}
          series={[totalBalance()]}
          width="250"
        />
        <div className="-ml-6 md:ml-0">
          <p className="text-gray-400">Balance</p>
          {totalIncome() >= totalExpense() ? (
            <h1 className="text-green-400 text-3xl font-thin font-numero">
              ${totalIncome() - totalExpense()}
            </h1>
          ) : (
            <h1 className="text-3xl font-thin font-numero text-yellow-400">
              {totalIncome() - totalExpense()}
            </h1>
          )}
        </div>
      </div>
      {/* INCOME EXPENSES */}
      <div className="bg-transparent text-gray-50 rounded-md mx-3 mb-8 flex ">
        <div className="relative bg-cyan-500 border border-cyan-300 w-1/2 p-2 text-sm px-4 rounded mr-3">
          <span className="text-gray-200">Income</span>
          <br />
          <span className="text-xl font-numero">${totalIncome()}</span>{" "}
          <span className="font-numero text-cyan-400"> </span>
          <PiWalletThin className="absolute top-4 right-3 text-4xl text-cyan-300" />
        </div>
        <div className="relative bg-red-400 border border-red-300 w-1/2 p-2 text-sm px-4 rounded">
          <span className="text-gray-200">Expenses</span>
          <br />
          <span className="text-xl font-numero font-extralight">
            ${totalExpense()}
          </span>{" "}
          <PiShoppingCartSimpleLight className="absolute top-4 right-3 text-4xl text-red-300" />
        </div>
      </div>
      {/* TRANSACTIONS */}
      <div className="text-gray-700 px-3 mb-8">
        <div className="py-3 uppercase text-sm tracking-wider">
          Recent Transactions{" "}
          <span className="font-numero">({transformData().length})</span>
        </div>
        {transformData().map((item, index) => (
          <div
            key={index}
            className="bg-white shadow pl-3 pr-4 mb-3 rounded-md flex flex-row items-start"
          >
            <div className="p-0.5 mt-2 rounded-xl border border-gray-200 bg-gray-100 mr-3">
              <img
                src={cargarImagen(`./${item.category}.png`)}
                style={{ width: "40px" }}
                alt={item.category}
              />
            </div>
            <div className="w-full flex justify-between">
              <div className="py-2">
                <h1 className="tracking-wide ">{item.category} </h1>
                <p className="text-sm leading-tight font-numero italic text-gray-400">
                  {item.comment}
                </p>
              </div>

              <div className="text-right py-2">
                <div
                  className={`text-lg -mb-1 font-numero ${
                    item.type === "Income" ? " text-blue-500 " : "text-red-400"
                  } `}
                >
                  {item.type === "Income"
                    ? " + $" + item.total
                    : " - $" + item.total}
                </div>
                <div className="whitespace-nowrap text-sm font-numero text-gray-400">
                  {item.date.substr(5, 5) === monthDay ? (
                    <h1>Hoy {nombreDelDiaSegunFecha(item.date)}</h1>
                  ) : (
                    <p className="border border-gray-200 rounded-md px-1">
                      {nombreDelDiaSegunFecha(item.date) +
                        " " +
                        item.date.substr(8, 2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
