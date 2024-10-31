import { Outlet } from "react-router-dom";
import Navbar from "./common/Navbar/Navbar";
import Footer from "./common/Footer/Footer";

function App() {
  return (
    <>
      {window.innerWidth <= 768 ? (
        <div className="mobile">
          Mobile site is being built, please check back soon!
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
