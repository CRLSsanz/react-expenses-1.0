import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppProvider";
import Home from "./pages/Home";
import About from "./pages/About";
import Analytics from "./components/Analytics";
import Transactions from "./components/Transactions";
import Formulario from "./components/Formulario";
const bag3 = "https://github.com/CRLSsanz/trade/blob/main/panal1.jpg?raw=true";

function App() {
  return (
    <AppProvider>
      <div
        className="bg-gray-950 min-h-screen flex flex-col"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${bag3})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <BrowserRouter>
          <div className="w-full fixed z-10 top-0">
            <Navbar />
          </div>
          <div className="mt-32 mx-5 min-h-[calc(100vh-150px)] bg-gray-50 rounded-2xl rounded-tl-[80px] rounded-br-[40px]">
            <Routes>
              <Route index element={<Home />} />
              <Route path="expenses/" element={<Home />} />
              <Route path="expenses/home" element={<Home />} />
              <Route path="expenses/about" element={<About />} />
              <Route path="expenses/analytics" element={<Analytics />} />
              <Route path="expenses/formulario" element={<Formulario />} />
              <Route path="expenses/transactions" element={<Transactions />} />
              {/** 
                <Route path="expenses/page2" element={<Page2 />} />
                <Route path="expenses/page3" element={<Details />} />
                */}
            </Routes>
          </div>
          <div className="py-10 flex justify-center text-gray-100">Foooter</div>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
