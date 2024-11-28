import RootLayout from "../Layout/RootLayout/RootLayout";
import AddCoffee from "../pages/AddCoffee/AddCoffee";
import Home from "../pages/Home/Home";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-coffee",
        element: <AddCoffee />,
      },
    ],
  },
]);
