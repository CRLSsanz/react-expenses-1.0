import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppProvider";
import Home from "./pages/Home";
import About from "./pages/About";
import Analytics from "./components/Analytics";
import Transactions from "./components/Transactions";
import Formulario from "./components/Formulario";
import ResumenMensual from "./components/ResumenMensual";
import Movimientos from "./components/Movimientos";
//  "homepage": "http://crlssanz.unaux.com/expenses/",

const bag0 =
  "https://r4.wallpaperflare.com/wallpaper/583/42/546/blue-lines-digital-art-abstract-wallpaper-29e0087dd13a4dcb6657089fd0c1869d.jpg";
const bag3 = "https://github.com/CRLSsanz/trade/blob/main/panal1.jpg?raw=true";
const bag2 =
  "https://c0.wallpaperflare.com/path/91/628/867/adolescent-beautiful-brunette-buy-2475da7e0a113381084dbb5becb8962a.jpg";

function App() {
  return (
    <AppProvider>
      <div
        className="bg-gray-950 min-h-screen flex flex-col justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(0,0,0,0.5)), url(${bag2})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          //backgroundPosition: "30%",
        }}
      >
        <BrowserRouter>
          <div className="w-full fixed z-10 top-0">
            <Navbar />
          </div>
          <div className="w-full flex justify-center">
            <div className="md:max-w-[600px] mt-32 mx-3 min-h-[calc(100vh-150px)] bg-gray-50 rounded-2xl rounded-tl-[80px] rounded-br-[40px]">
              <Routes>
                <Route index element={<Home />} />
                <Route path="expenses/" element={<Home />} />
                <Route path="expenses/home" element={<Home />} />
                <Route path="expenses/rs" element={<ResumenMensual />} />
                <Route path="expenses/mo" element={<Movimientos />} />
                <Route path="expenses/about" element={<About />} />
                <Route path="expenses/analytics" element={<Analytics />} />
                <Route path="expenses/formulario" element={<Formulario />} />
                <Route
                  path="expenses/transactions"
                  element={<Transactions />}
                />
                {/** 
                <Route path="expenses/page2" element={<Page2 />} />
                <Route path="expenses/page3" element={<Details />} />
                */}
              </Routes>
            </div>
          </div>

          <div className="py-10 flex justify-center text-gray-100">Foooter</div>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
