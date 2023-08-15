import React from "react";
import Chart from "react-apexcharts";
import { PiWalletThin, PiShoppingCartSimpleLight } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineLeft, AiOutlineMinus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscCloseAll } from "react-icons/vsc";
import { useAppContext } from "../context/AppProvider";
const cargarImagen = require.context("../images", true);

const Transactions = () => {
  const { datos, filterStateMovim, filterDispatchMovim, transactionDelete } =
    useAppContext();
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

  //console.log(result);

  //
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
          size: "45%", // grosor del circulo
          background: "#F8F5F5", // 6D28D9 fonfo gris oscuro
        },
        track: {
          background: "#F2F4F6", // borde no lleno
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
            offsetY: 6, //elevar texto
            color: "#aaa", //color del texto 86%
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

  const handleDelete = (id) => {
    //alert("eliminar doc con el id: " + id);
    transactionDelete(id);
  };

  return (
    <div className="w-full md:max-w-[600px] mt-32 mx-4 md:py-4 md:px-12 min-h-[calc(100vh-250px)] bg-white/95 rounded-2xl rounded-tr-[40px] rounded-bl-[40px]">
      {/* TITLE - FILTER */}
      <div className="px-8 pt-8 mb-4 flex items-center justify-between">
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
        <div className="absolute w-[calc(100%-1px)] md:w-[calc(100%-48px)] h-[330px] md:bg-gray-50X border shadow-md md:px-6">
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
      <div className="-mt-2 z-auto bg-gradient-to-br from-purple-700  to-pink-700 text-gray-50 rounded-lg mx-6 md:mx-12 mb-10 flex pt-2 ">
        <div className="flex flex-col items-center text-center w-1/2 p-2 text-sm px-6">
          <PiWalletThin className="bg-blue-400/50 w-12 h-12 rounded-full p-2 text-4xl text-cyan-300" />
          <span className="mt-2 py-1 text-2xl font-numero">
            ${totalIncome()}
          </span>{" "}
          <span className="-mt-2 text-cyan-100">Income</span>
        </div>
        <div className="flex flex-col text-center items-center w-1/2 p-2 text-sm px-6">
          <PiShoppingCartSimpleLight className="bg-red-400/50 w-12 h-12 rounded-full p-2 text-4xl text-red-300" />
          <span className="mt-2 py-1 text-2xl font-numero">
            ${totalExpense()}
          </span>{" "}
          <span className="-mt-2 text-red-100">Expenses</span>
        </div>
      </div>
      {/* TRANSACTIONS */}
      <div className=" px-6 md:px-6 mb-10">
        <div className="text-cyan-600 py-3 pl-2 text-xl">
          Recent transactions{" "}
          <span className="font-numero">({transformData().length})</span>
        </div>
        {transformData().map((item, index) => (
          <div
            key={index}
            className={`relative bg-white shadow border-b-2 rounded-lg p-3 mb-2
            flex flex-col items-start ${
              item.type === "Income" ? " border-cyan-500  " : " border-red-400 "
            } `}
          >
            <div className="absolute top-3 left-3 shadow bg-gray-100 rounded-full p-2">
              <img
                src={cargarImagen(`./${item.category}.png`)}
                style={{ width: "25px" }}
                alt={item.category}
              />
            </div>

            <div className="pl-12 border-b border-gray-100 w-full flex flex-row justify-between items-center mb-1">
              <div className="whitespace-nowrap text-sm text-end font-numero ">
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
              <div
                className={`text-gray-600X text-base whitespace-nowrap font-numero font-normal ${
                  item.type === "Income" ? " text-blue-500 " : "text-red-500"
                } `}
              >
                {item.type === "Income" ? (
                  <span className="hidden font-bold text-blue-500">{" +"}</span>
                ) : (
                  <span className="hidden font-semibold text-red-500">
                    {" - "}
                  </span>
                )}
                <span className="text-sm">{"$"}</span>
                {item.total}
              </div>
            </div>

            <p className="w-full pl-12 pr-10 pt-0.5 text-justify text-xs tracking-wide leading-tight text-gray-400 flex items-center">
              {item.comment}
            </p>

            {/** CLOSE */}
            <div className="absolute bottom-2.5 right-3 shadowX bg-whiteX rounded-full p-2X ">
              <MdDeleteOutline
                className="text-lg text-gray-300"
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
