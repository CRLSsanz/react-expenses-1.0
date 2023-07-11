import React from "react";
import ResumenMensual from "../components/ResumenMensual";
import Movimientos from "../components/Movimientos";
import Formulario from "../components/Formulario";
import About from "./About";

const Home = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <section id="section1" className="bg-[#111] h-screen flex">
        <div className="m-auto">
          <About />
        </div>
      </section>

      <section id="section2" className="min-h-[700px] bg-[#1A2035] flex">
        <div className="my-autooo w-full px-2">
          <h1 className="h-16"></h1>
          <ResumenMensual />
        </div>
      </section>

      <section id="section3" className="min-h-[700px] bg-white flex">
        <div className="my-autooo w-full px-2">
          <h1 className="font-waterfall text-7xlll text-purple-600 font-bold">
            <br />
            <br />
          </h1>
          <Formulario />
        </div>
      </section>

      <section id="section4" className="min-h-[700px] bg-black flex">
        <div className="my-autooo w-full px-2">
          <h1 className="font-waterfall text-7xlll text-purple-600 font-bold">
            <br />
            <br />
          </h1>
          <Movimientos />
        </div>
      </section>

      <section id="section5" className="text-white h-screen flex lg:hidden">
        <h1 className="m-auto font-waterfall text-7xl text-purple-600 font-bold">
          Footer
        </h1>
      </section>
    </div>
  );
};

export default Home;
