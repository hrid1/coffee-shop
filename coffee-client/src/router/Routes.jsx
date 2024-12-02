import UpdateCofe from "../components/UpdateCofe/UpdateCofe";
import RootLayout from "../Layout/RootLayout/RootLayout";
import AddCoffee from "../pages/AddCoffee/AddCoffee";
import Register from "../pages/Auth/Register";
import SignIn from "../pages/Auth/SignIn";
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
        loader: () => fetch("http://localhost:4000/coffee/"),
      },
      {
        path: "/add-coffee",
        element: <AddCoffee />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/update-cofe/:id",
        element: <UpdateCofe />,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/coffee/${params.id}`),
      },
    ],
  },
]);
