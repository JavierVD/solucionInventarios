import Catalog from "./components/Catalog";
import { FetchData } from "./components/FetchData";
import Home from "./components/Home";
import Outputs from "./components/Outputs";
import Inputs from "./components/Inputs";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/catalog',
    element: <Catalog />
  },
  {
    path: '/ins',
    element: <Inputs />
    },
    {
    path: '/outs',
    element: <Outputs />
    }
];

export default AppRoutes;
