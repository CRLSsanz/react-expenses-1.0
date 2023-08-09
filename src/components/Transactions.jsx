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
  //const age = hoy.substr(0, 4);
  const month = hoy.substr(5, 2);
  const monthDay = hoy.substr(5, 5);

  //
  const data = [
    {
      society: "1000",
      centro: "2005",
      nameStore: "TIENDA",
      dateOfCreation: "2021-02-11",
      yearCreation: "2021",
    },
    {
      society: "1000",
      centro: "3008",
      nameStore: "TIENDA",
      dateOfCreation: "2021-01-08",
      yearCreation: "2021",
    },
    {
      society: "1000",
      centro: "3006",
      nameStore: "TIENDA",
      dateOfCreation: "2021-01-09",
      yearCreation: "2021",
    },
    {
      society: "1000",
      centro: "3001",
      nameStore: "TIENDA",
      dateOfCreation: "2021-01-09",
      yearCreation: "2022",
    },
  ];

  const grouped_data = data.reduce(function (r, x) {
    const month = x["dateOfCreation"].split("-")[1];

    r[x["yearCreation"]] = r[x["yearCreation"]] || {};
    (r[x["yearCreation"]][month] = r[x["yearCreation"]][month] || []).push(x);

    return r;
  }, {});

  const result = Object.keys(grouped_data).map((k) => ({
    year: k,
    months: Object.keys(grouped_data[k]).map((l) => ({
      month: l,
      data: grouped_data[k][l],
    })),
  }));

  console.log(result);

  //
  const nombreDelDiaSegunFecha = (fecha) =>
    ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][
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
    transformData().forEach(function (value) {
      if (value.type === "Expense") total += value.total;
    });
    return total;
  };
  const totalIncome = () => {
    let total = 0;
    transformData().forEach(function (value) {
      if (value.type === "Income") total += value.total;
    });

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
    <div className="w-full md:max-w-[600px] mt-32 mx-4 md:py-4 md:px-12 min-h-[calc(100vh-250px)] bg-white/95 rounded-2xl rounded-tr-[40px] rounded-bl-[40px]">
      {/* TITLE - FILTER */}
      <div className="px-8 pt-8 mb-4  flex items-center justify-between">
        <div className="text-cyan-600 text-xl">Summary </div>
        <div className="text-gray-500 px-2 bg-gray-50 shadow-md rounded-full">
          <select
            defaultValue={byMonth}
            onChange={(e) =>
              filterDispatchMovim({
                type: "FILTER_BY_MONTH",
                payload: e.target.value,
              })
            }
            className="focus:outline-none appearance-none bg-transparent p-2"
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
          <h1 className="inline-block font-numero pr-2">2023</h1>
        </div>
      </div>
      {/* CHART */}
      <div className="relative pt-2 flex md:justify-center">
        <div className="absolute w-[calc(100%-1px)] md:w-[calc(100%-48px)] h-[270px] md:bg-gray-50 border shadow-md md:px-6">
          {" "}
        </div>
        <Chart
          type="radialBar"
          options={options1}
          series={[totalBalance()]}
          width="250"
        />
        <div className="z-10 -ml-6 my-auto md:ml-0">
          <p className="text-gray-400">Balance</p>
          {totalIncome() >= totalExpense() ? (
            <h1 className="text-green-500 text-3xl font-extralight font-numero">
              ${totalIncome() - totalExpense()}
            </h1>
          ) : (
            <h1 className="text-3xl font-numero text-yellow-400">
              {totalIncome() - totalExpense()}
            </h1>
          )}
        </div>
      </div>
      {/* INCOME EXPENSES */}
      <div className="-mt-2 bg-transparent text-gray-50 rounded-md mx-6 md:mx-12 mb-10 flex ">
        <div className="relative bg-gradient-to-r from-cyan-500 to-cyan-400 text-right w-1/2 p-2 text-sm px-6 rounded-l-full">
          <span className="text-gray-100">Income</span>
          <br />
          <span className="text-xl font-numero">${totalIncome()}</span>{" "}
          <span className="font-numero text-cyan-400"> </span>
          <PiWalletThin className="absolute top-3.5 left-4 text-4xl text-cyan-300" />
        </div>
        <div className="relative bg-gradient-to-r from-pink-400 to-red-500 w-1/2 p-2 text-sm px-6 rounded-r-full">
          <span className="text-gray-100">Expenses</span>
          <br />
          <span className="text-xl font-numero">${totalExpense()}</span>{" "}
          <PiShoppingCartSimpleLight className="absolute top-4 right-4 text-4xl text-red-300" />
        </div>
      </div>
      {/* TRANSACTIONS */}
      <div className=" px-4 md:px-6 mb-10">
        <div className="text-cyan-600 py-3 pl-4 text-xl">
          Recent transactions{" "}
          <span className="font-numero">({transformData().length})</span>
        </div>
        {transformData().map((item, index) => (
          <div
            key={index}
            className={`bg-gray-50 shadow pl-3 pr-4 mb-0 
            border-r-4 flex flex-row items-start ${
              item.type === "Income" ? " border-cyan-400 " : "border-red-400"
            } `}
          >
            <div className="p-1.5 mt-3 rounded-2xl shadow-md border border-gray-100 bg-gray-50 mr-3">
              <img
                src={cargarImagen(`./${item.category}.png`)}
                style={{ width: "35px" }}
                alt={item.category}
              />
            </div>
            <div className="w-full py-3">
              <div className="flex flex-row justify-between">
                <p className="leading-tight flex py-1 items-center">
                  {item.comment}
                </p>
                <div
                  className={`text-lg whitespace-nowrap font-numero font-light ${
                    item.type === "Income" ? " text-blue-500 " : "text-red-400"
                  } `}
                >
                  {item.type === "Income"
                    ? " + $" + item.total
                    : " - $" + item.total}
                </div>
              </div>

              <div className="text-xs flex flex-row justify-between">
                <h1 className="tracking-wide text-gray-400 ">
                  {item.category}{" "}
                </h1>
                <div className="whitespace-nowrap font-numero text-gray-400">
                  {item.date.substr(5, 5) === monthDay ? (
                    <h1>Hoy {nombreDelDiaSegunFecha(item.date)}</h1>
                  ) : (
                    <p>
                      {nombreDelDiaSegunFecha(item.date) +
                        ", " +
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
