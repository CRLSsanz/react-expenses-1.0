import React from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

const About = () => {
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
  const options2 = {
    labels: [
      "Salud",
      "Mascota",
      "Transporte",
      "Compras",
      "Alimentos",
      "Vacaciones",
    ],
  };

  return (
    <div className="text-base px-8">
      <h1 className="h-16"></h1>
      {/**
      <Chart
        type="donut"
        options={options2}
        series={[41, 55, 41, 15, 15, 5]}
        width="350"
      />
      <br />
      <Chart
        type="area"
        width={350}
        height={200}
        series={serie1}
        options={option1}
        //stroke={{ curve: "stepline" }}
      />
 */}
      <h1 className="text-4xl text-gray-300 mb-3">
        Manage your <span className="text-cyan-600">Expenses</span> more easily
      </h1>
      <p className=" text-gray-500 text-sm mb-6">
        Get complete control over your expenses and save as mush as you want.
      </p>
      <Link
        to="/expenses/analitycs"
        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Get started
      </Link>
    </div>
  );
};

export default About;
