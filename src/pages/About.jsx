import React from "react";
import Chart from "react-apexcharts";

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
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
    },
  };
  const options2 = {
    labels: ["A", "B", "C", "D", "E", "F"],
  };

  return (
    <div className="text-base px-4">
      <h1 className="h-16"></h1>
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

      <h1 className="text-4xl text-gray-300 mb-3">
        Controla tus gastos e ingresos
      </h1>
      <p className=" text-gray-500 text-sm mb-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut distinctio
        necessitatibus dicta minima quia blanditiis.{" "}
      </p>
      <a
        href="#section3"
        className="bg-[#e7e7e7] text-sm py-3 px-5 text-gray-900"
      >
        Get Started
      </a>
    </div>
  );
};

export default About;
