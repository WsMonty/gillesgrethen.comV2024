import { Outlet } from "react-router-dom";
import Navbar from "./common/Navbar/Navbar";
import Footer from "./common/Footer/Footer";

function App() {
  const location = window.location.pathname;

  return (
    <>
      {location !== "/blog" && location !== "/chroma" && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
