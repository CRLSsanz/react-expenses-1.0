import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppProvider";
import Home from "./pages/Home";

function App() {
  return (
    <AppProvider>
      <div className="">
        <div className="w-full fixed z-10 top-0">
          <Navbar />
        </div>
        <Home />
      </div>
    </AppProvider>
  );
}

export default App;
