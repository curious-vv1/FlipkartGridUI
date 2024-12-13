import { useState } from "react";

// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./HomePage";
import FruitsVegPage from "./FruitsVegPage";
import LivePage from "./LivePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/fruits&Veg",
      element: <FruitsVegPage />,
    },
    {
      path: "/live",
      element: <LivePage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
