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

const Analytics = () => {
  const { datos, filterState, filterDispatch } = useAppContext();

  const { byAge, byMonth, byControl } = filterState;

  const month = 0;

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
  //console.log(resultado2);
  console.log(dataType);
  console.log(dataCategory);

  const valorMax = () => {
    let max3 = Object.entries(resultado2).map(([val1, val2]) => (val2 = val2));
    return Math.max(...max3);
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

  const serie1 = [
    { name: "Income", data: [140, 270, 292, 142, 622, 532, 683] },
    { name: "Expenses", data: [100, 200, 232, 432, 422, 132, 432] },
  ];
  const option1 = {
    colors: ["#089ABA", "#ff0000"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
      ],
    },
  };
  return (
    <div className="bg-gray-50 rounded-2xl md:w-[600px]">
      <div className="text-cyan-600 px-8 pt-12 flex items-center justify-between">
        <div className="text-xl">Analytics</div>
      </div>
      <div className=" bg-transparent p-2 mx-2 flex justify-center">
        <Chart
          type="area"
          width={330}
          height={200}
          series={serie1}
          options={option1}
          //stroke={{ curve: "stepline" }}
        />
      </div>

      {/* FILTER */}
      <div className="mx-6 my-4">
        <h1 className="inline-block pr-4">Categoria por mes:</h1>
        <select
          defaultValue={month}
          onChange={(e) =>
            filterDispatch({
              type: "FILTER_BY_MONTH",
              payload: e.target.value,
            })
          }
          className="focus:outline-none text-sm bg-white p-2 px-3 border border-gray-200 shadow-lg rounded-md"
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
      </div>
      {/* LIST */}
      <div className="hidden bg-[#202940] text-gray-200 p-4 rounded-md mx-2 mb-4">
        <div className="lg:max-h-[calc(100vh-450px)] lg:overflow-y-scroll pt-4">
          {Object.entries(dataCategory)
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
      </div>

      {/** LIST DATOS */}
      <div className="bg-gray-100 text-gray-400 shadow-lg rounded-md rounded-br-[30px] pt-4 px-1 mx-6 mb-8">
        <div className="w-full grid grid-cols-4 ">
          {Object.entries(dataCategory)
            .sort()
            .map(([key, value]) => (
              <div key={key} className="flex flex-col  items-center mb-4">
                <div
                  className={`relative w-14 h-14 flex items-center justify-center rounded-full border-4 border-purple-300 bg-gray-200 }`}
                >
                  <img
                    className=" absolute rounded-sm"
                    src={cargarImagen(`./${key}.png`)}
                    style={{ width: "40px" }}
                    alt={key}
                  />
                </div>
                <h4
                  className={`font-light font-numero ${color(key, "text")}
                  } `}
                >
                  ${value}
                </h4>
                <h4 className="truncateXX w-full text-center text-sm font-medium">
                  {key}
                </h4>
              </div>
            ))}
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Analytics;
