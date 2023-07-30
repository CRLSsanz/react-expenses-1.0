import React from "react";
import ResumenMensual from "../components/ResumenMensual";
import Movimientos from "../components/Movimientos";
import Formulario from "../components/Formulario";
import About from "./About";
import Transactions from "../components/Transactions";
import Analytics from "../components/Analytics";
const bag3 = "https://github.com/CRLSsanz/trade/blob/main/panal1.jpg?raw=true";

const Home = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <section
        id="section1"
        className="bg-gray-950 min-h-screen flex"
        style={
          {
            //backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${bag3})`,
            //backgroundSize: "cover",
            //backgroundAttachment: "fixed",
          }
        }
      >
        <div className="m-auto">
          <About />
        </div>
      </section>

      <section id="section2" className="min-h-[700px] bg-[#1A2035] flex">
        <div className="my-autooo w-full px-2">
          <h1 className="h-16"></h1>
          <Analytics />
        </div>
      </section>

      <section id="section3" className="min-h-[700px] bg-[#1A2035] flex">
        <div className="my-autooo w-full px-2">
          <h1 className="h-20"></h1>
          <Formulario />
        </div>
      </section>

      <section id="section4" className="min-h-[700px] bg-[#1A2035] flex">
        <div className="my-autooo w-full px-2">
          <h1
            //className="font-waterfall text-7xlll text-purple-600 font-bold"
            className="h-20"
          ></h1>
          <Transactions />
        </div>
      </section>

      <section
        id="section5"
        className="text-white h-screen bg-[#1A2035] flex lg:hidden"
      >
        <h1 className="m-auto font-waterfall text-7xl text-purple-600 font-bold">
          Footer
        </h1>
      </section>
    </div>
  );
};

export default Home;
