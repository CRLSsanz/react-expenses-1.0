import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppProvider";
import { BiHeart } from "react-icons/bi";
import Home from "./pages/Home";
import About from "./pages/About";
import Analytics from "./components/Analytics";
import Transactions from "./components/Transactions";
import Formulario from "./components/Formulario";
import ResumenMensual from "./components/ResumenMensual";
import Movimientos from "./components/Movimientos";
import { useState } from "react";
import { useEffect } from "react";
//  "homepage": "http://crlssanz.unaux.com/expenses/",

/*const bag3 = "https://github.com/CRLSsanz/trade/blob/main/panal1.jpg?raw=true";
const bag0 =
  "https://r4.wallpaperflare.com/wallpaper/583/42/546/blue-lines-digital-art-abstract-wallpaper-29e0087dd13a4dcb6657089fd0c1869d.jpg"; */
const bag2 =
  //"https://r4.wallpaperflare.com/wallpaper/681/554/339/abstract-planet-space-purple-wallpaper-6970a84df14a9dbb16f7683f30a186ad.jpg";
  "https://r4.wallpaperflare.com/wallpaper/580/191/825/space-planet-abstract-space-art-wallpaper-8b76cc7df351ff090594eba99d9c7c80.jpg";
//"https://r4.wallpaperflare.com/wallpaper/853/586/450/universe-abstract-cube-gradient-wallpaper-6920483dc13a7d2b3657880f4071d63d.jpg";
//"https://c0.wallpaperflare.com/path/91/628/867/adolescent-beautiful-brunette-buy-2475da7e0a113381084dbb5becb8962a.jpg";

function App() {
  const [count, setCount] = useState(734);
  const [fin, setFin] = useState(false);

  const handleSum = () => setCount(count + 1);
  const handleSum10 = () => {
    setFin(true);
    if (fin) {
      setCount(count + 3);
      setFin(false);
    }
  };

  setTimeout(handleSum10, 5000);

  //"homepage": "http://crlssanz.unaux.com/expenses/",
  const web = "";
  //const web = "expenses";

  return (
    <AppProvider>
      <div
        className="bg-gray-950 min-h-screen flex flex-col justify-between"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${bag2})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "50%",
        }}
      >
        <BrowserRouter>
          <div className="w-full flex fixed z-50 top-0">
            <Navbar />
          </div>
          <div className="w-full flex justify-center">
            <Routes>
              <Route index element={<About />} />
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/formulario" element={<Formulario />} />
              <Route path="/transactions" element={<Transactions />} />
              {/*
              <Route path="expenses/about" element={<About />} />
              <Route path="expenses/analytics" element={<Analytics />} />
              <Route path="expenses/formulario" element={<Formulario />} />
              <Route path="expenses/transactions" element={<Transactions />} />
              
              */}

              {/** 
              <Route path="expenses/rs" element={<ResumenMensual />} />
              <Route path="expenses/mo" element={<Movimientos />} />
                <Route path="expenses/page2" element={<Page2 />} />
                <Route path="expenses/page3" element={<Details />} />
                */}
            </Routes>
          </div>
          {/** FOOTER */}
          <div className="relative py-10 flex justify-center items-center text-gray-100">
            <BiHeart
              className="text-2xl lg:text-3xl text-red-500 mx-2 active:animate-ping hover:cursor-pointer"
              onClick={handleSum}
            />
            <span className="font-numero text-sm lg:text-base tracking-wider">
              {count}
            </span>
            <h1 className="absolute top-20 text-xs tracking-wider font-numeroX">
              <a
                href="http://cs-p.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://w.carlo.net
              </a>{" "}
            </h1>
          </div>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
