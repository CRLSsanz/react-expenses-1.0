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
  const { byYear, byMonth } = filterState;

  const transformData = () => {
    let data = datos;
    //console.log(datos);

    if (byYear) {
      data = data.filter(
        (item) =>
          item.date >= `${byYear}-01-01` && item.date <= `${byYear}-12-32`
      );
    }

    if (byMonth) {
      data = data.filter(
        (item) =>
          item.date >= `${byYear}-${byMonth}-01` &&
          item.date < `${byYear}-${byMonth}-32`
      );
    }

    return data;
  };

  const transformDataChart = () => {
    let data = datos;
    if (byYear) {
      data = data.filter(
        (item) =>
          item.date >= `${byYear}-01-01` && item.date <= `${byYear}-12-32`
      );
    }
    return data;
  };

  const resultado2 = datos.map((item) => item.type);

  // EJEMPLOS - AYUDA
  const valorMax = () => {
    let max3 = Object.entries(resultado2).map(([val1, val2]) => (val2 = val1));
    return Math.max(...max3);
  };
  const dataType = transformData().reduce(
    (prev, cur) => (
      (prev[cur.type] = prev[cur.type] + cur.total || cur.total), prev
    ),
    {}
  );
  // DATOS POR CATEGORIAS
  const dataCategory = transformData().reduce(
    (prev, cur) => (
      (prev[cur.category] = prev[cur.category] + cur.total || cur.total), prev
    ),
    {}
  );

  // VISTA GENERAL - INCOME EXPENSES BALANCE
  const totalBalance = transformDataChart().reduce(
    (prev, cur) => (
      (prev[cur.type] = prev[cur.type] + cur.total || cur.total), prev
    ),
    {}
  );

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
  const objExp = transformDataChart().reduce((acum, item) => {
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

  const objInc = transformDataChart().reduce((acum, item) => {
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
      {/* TITULO - FILTER YEAR */}
      <div className="text-cyan-600 px-8 pt-8 pb-4 flex items-center justify-between">
        <div className="text-xl">Analytics</div>
        <div className="text-gray-500 px-2 bg-gray-50 shadow-md rounded-full">
          <select
            defaultValue={byYear}
            onChange={(e) =>
              filterDispatch({
                type: "FILTER_BY_YEAR",
                payload: e.target.value,
              })
            }
            className="focus:outline-none appearance-none bg-transparent p-2 font-numero"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>
      {/* BALANCE */}
      <div className=" bg-gray-50 rounded-lg shadow-lg font-medium py-3 px-4 mx-6 mb-8">
        <h1 className="text-gray-400 pb-3">Overview of the year</h1>
        <div className="w-full flex justify-between pt-2">
          <div className="text-cyan-600 pl-1 text-lg font-numero border-l-2 border-cyan-400">
            {totalBalance.Income}.00 €
          </div>
          <div className="text-green-600 font-numero text-end">
            {totalBalance.Income - totalBalance.Expense}.00 €
          </div>
          <div className="text-red-600 pr-1 text-lg font-numero border-r-2 border-red-400">
            {totalBalance.Expense}.00 €
          </div>
        </div>
        <div className="w-full text-gray-500 flex justify-between mb-1">
          <div className="tracking-wider pl-1 border-l-2 border-cyan-400">
            Income
          </div>
          <div className="tracking-wider hidden ">Balance</div>
          <div className="tracking-wider pr-1 border-r-2 border-red-400">
            Expense
          </div>
        </div>
      </div>

      {/* CHART */}
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

      {/* FILTER MONTH */}
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
      {/* LIST DATOS */}
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
                  {value}
                  <span className="text-[10px] -pt-6">.00 €</span>
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
