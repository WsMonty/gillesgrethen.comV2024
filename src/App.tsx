import { Outlet } from "react-router-dom";
import Navbar from "./common/Navbar/Navbar";
import Footer from "./common/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
