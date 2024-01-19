import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/root";
import ErrorPage from "./error-page";
import InfoPage from "./routes/info";
import PlanPage from "./routes/plan";
import AddonsPage from "./routes/addons";
import SummaryPage from "./routes/summary";
import ThanksPage from "./routes/thanks";

const routes = [
  {
    path: "/info",
    element: <InfoPage />,
  },
  {
    path: "/plan",
    element: <PlanPage />,
  },
  {
    path: "/addons",
    element: <AddonsPage />,
  },
  {
    path: "/summary",
    element: <SummaryPage />,
  },
  {
    path: "/thanks",
    element: <ThanksPage />,
  },
];

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: routes,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
