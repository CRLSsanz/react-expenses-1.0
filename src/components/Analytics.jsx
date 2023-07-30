import React from "react";
import Chart from "react-apexcharts";
import { useAppContext } from "../context/AppProvider";

const Analytics = () => {
  const { datos } = useAppContext();

  const transformData = () => {
    let data = datos;

    data = data.filter(
      (item) => item.date >= `2023-06-01` && item.date <= `2023-09-31`
    );

    return data;
  };

  const resultado2 = datos.map((item) => item.type);

  datos.reduce(
    (prev, cur) => (
      (prev[cur.type] = prev[cur.type] + cur.total || cur.total), prev
    ),
    {}
  );

  console.log(resultado2);
  console.log(transformData());

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
    <>
      <div className="text-cyan-600 px-8 mt-12 flex items-center justify-between">
        <div className="text-xl">Analytics</div>
      </div>
      <div className=" bg-transparent p-2 mx-2">
        <Chart
          type="area"
          width={330}
          height={200}
          series={serie1}
          options={option1}
          //stroke={{ curve: "stepline" }}
        />
      </div>
    </>
  );
};

export default Analytics;
