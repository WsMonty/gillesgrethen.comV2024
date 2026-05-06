import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Music from "../pages/Music/Music";
import Shop from "../pages/Shop/Shop";
import About from "../pages/About/About";
import Chroma from "../pages/Chroma/Chroma";
import Blog from "../pages/Blog/Blog";
import Gigs from "../pages/Music/Gigs";
import NewLinkList from "../pages/LinkLists/NewLinkList";
import FinnishCards from "../pages/finnish-cards/FinnishCards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/music",
        element: <Music />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/chroma",
        element: <Chroma />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/gigs",
        element: <Gigs />,
      },
      {
        path: "/linklists/*",
        element: <NewLinkList />,
      },
      {
        path: "/finnish-cards",
        element: <FinnishCards />,
      },
    ],
  },
]);

export default router;
