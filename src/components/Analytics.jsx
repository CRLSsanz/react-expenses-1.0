import React from "react";
import Chart from "react-apexcharts";
import { useAppContext } from "../context/AppProvider";
const cargarImagen = require.context("../images", true);

const incomeCategory = [
  "Alquiler", //
  "Cliente", //
  "Negocios", //
  "Regalo", //
  "Salario",
  "Servicios",
  "Otros ingresos",
];

const cmeses = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const Analytics = () => {
  const { datos, filterState, filterDispatch } = useAppContext();
  const { byAge, byMonth, byControl } = filterState;

  const transformData = () => {
    let data = datos;
    //console.log(datos);

    if (byAge) {
      data = data.filter(
        (item) => item.date >= `${byAge}-01-01` && item.date <= `${byAge}-12-32`
      );
    }

    if (byMonth) {
      data = data.filter(
        (item) =>
          item.date >= `${byAge}-${byMonth}-01` &&
          item.date < `${byAge}-${byMonth}-32`
      );
    }

    return data;
  };

  const resultado2 = datos.map((item) => item.type);

  const dataType = transformData().reduce(
    (prev, cur) => (
      (prev[cur.type] = prev[cur.type] + cur.total || cur.total), prev
    ),
    {}
  );

  const dataCategory = transformData().reduce(
    (prev, cur) => (
      (prev[cur.category] = prev[cur.category] + cur.total || cur.total), prev
    ),
    {}
  );

  const valorMax = () => {
    let max3 = Object.entries(resultado2).map(([val1, val2]) => (val2 = val1));
    return Math.max(...max3);
  };
  //console.log(valorMax());
  //console.log(dataType);

  // VISTA GENERAL

  const totalBalance = datos.reduce(
    (prev, cur) => (
      (prev[cur.type] = prev[cur.type] + cur.total || cur.total), prev
    ),
    {}
  );
  //console.log(totalBalance.Income);

  //COLOR
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

  // CHART
  const objExp = datos.reduce((acum, item) => {
    const [year, month] = item.date.split("-");
    //console.log("ano: " + year + " - mes: " + month);
    //console.log(item.date.substr(5, 2));
    //acum[item.type] = acum[item.type] + item.total || item.total;
    if (item.type === "Expense") {
      acum[month] = acum[month] + item.total || item.total;
    }
    return acum;
  }, []);
  //console.log(objExp);

  const objInc = datos.reduce((acum, item) => {
    const [year, month] = item.date.split("-");
    //console.log("ano: " + year + " - mes: " + month);
    //console.log(item.date.substr(5, 2));
    //acum[item.type] = acum[item.type] + item.total || item.total;
    if (item.type === "Income") {
      acum[month] = acum[month] + item.total || item.total;
    }
    return acum;
  }, []);

  let exp = [];
  let inc = [];
  let cmes = [];
  Object.entries(objExp) //usamos sort para ordenar ascendente.
    .sort()
    .map(([key, value]) => exp.push(value));
  Object.entries(objInc)
    .sort()
    .map(([key, value]) => inc.push(value));
  Object.entries(objExp)
    .sort()
    .map(([key, value]) => cmes.push(cmeses[Number(key) - 1]));
  //console.log(objExp);

  const serie1 = [
    { name: "Income", data: inc },
    { name: "Expenses", data: exp },
  ];
  const option1 = {
    colors: ["#089ABA", "#ff0000"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: cmes,
    },
  };

  return (
    <div className="w-full md:max-w-[600px] mt-32 mx-4 md:py-4 md:px-12 min-h-[calc(100vh-250px)] bg-white/95 rounded-2xl rounded-r-[40px]">
      <div className="text-cyan-600 px-8 pt-8 pb-4 flex items-center justify-between">
        <div className="text-xl">Analytics</div>
        <div className="text-base font-numero py-1">2023</div>
      </div>
      {/* BALANCE */}
      <div className=" bg-gray-50 rounded-lg shadow-lg font-medium py-3 px-4 mx-6 mb-8">
        <h1 className="text-gray-400 pb-3">Vista general del ano</h1>
        <div className="w-full flex justify-between border-l-2 border-cyan-400 px-3 py-2 mb-1">
          <div className="tracking-wider">Income</div>
          <div className="text-cyan-600 font-numero">
            $ {totalBalance.Income}.00
          </div>
        </div>
        <div className="w-full flex justify-between border-l-2 border-red-400 px-3 py-2 mb-1">
          <div className="tracking-wider">Expense</div>
          <div className="text-red-600 font-numero">
            $ {totalBalance.Expense}.00
          </div>
        </div>
        <div className="w-full flex justify-between border-l-2 border-green-400 px-3 py-2 mb-1">
          <div className="tracking-wider">Balance</div>
          <div className="text-green-600 font-numero">
            $ {totalBalance.Income - totalBalance.Expense}.00
          </div>
        </div>
      </div>

      {/** CHART */}
      <div className="relative bg-transparent pb-4 flex justify-center">
        <div className="absolute w-[calc(100%-1px)] md:w-[calc(100%-48px)] h-[260px] md:bg-gray-50 border shadow-md md:px-6">
          {" "}
        </div>
        <Chart
          className="py-4"
          type="area"
          width={"360"}
          height={220}
          series={serie1}
          options={option1}
          //stroke={{ curve: "stepline" }}
        />
      </div>
      {/* FILTER */}
      <div className="px-6 my-5 flex flex-row justify-between items-center">
        <h1 className="text-cyan-600 inline-block pr-4 text-xl">
          Category list
        </h1>
        <div className="relative">
          <select
            defaultValue={byMonth}
            onChange={(e) =>
              filterDispatch({
                type: "FILTER_BY_MONTH",
                payload: e.target.value,
              })
            }
            className="text-gray-500 pr-8 px-3 py-2 bg-gray-50 shadow-md rounded-full focus:outline-none text-sm border appearance-none"
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
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/** LIST DATOS */}
      <div className="bg-gray-50 text-gray-500 shadow-lg rounded-lg rounded-br-[15px] pt-4 px-1 mx-6 mb-10">
        <div className="w-full grid grid-cols-4 ">
          {Object.entries(dataCategory)
            .sort()
            .map(([key, value]) => (
              <div key={key} className="flex flex-col  items-center mb-4">
                <div
                  className={`relative w-14 h-14 flex items-center justify-center rounded-full border-4 border-gray-100 bg-purple-50 shadow-md mb-1 }`}
                >
                  <img
                    className=" absolute rounded-sm"
                    src={cargarImagen(`./${key}.png`)}
                    style={{ width: "35px" }}
                    alt={key}
                  />
                </div>
                <h4
                  className={`font-light font-numero ${color(key, "text")}
                  } `}
                >
                  ${value}
                </h4>
                <h4 className="truncateXX w-full text-center text-xs font-medium">
                  {key}
                </h4>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
