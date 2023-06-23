import { lazy } from "react";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { FrontPages } from "./FrontPages/FrontPages";
import { Projects } from "./Projects/Projects";
import { Db } from "./Db/Db";
import { Api } from "./Api/Api";

const FrontPageEditor = lazy(() => import(/* webpackChunkName: "FrontPageEditor" */ "./FrontPageEditor"));
const FrontPreview = lazy(() => import(/* webpackChunkName: "FrontPreview" */ "./FrontPreview"));

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export const authRoutes = [
  {
    path: "/",
    element: <Projects />,
  },
  {
    path: "/projects/:projectId/pages/:pageId/editor",
    element: <FrontPageEditor />,
  },
  {
    path: "/projects/:projectId/pages",
    element: <FrontPages />,
  },
  {
    path: "/projects/:projectId/db",
    element: <Db />,
  },
  {
    path: "/projects/:projectId/api",
    element: <Api />,
  },
  {
    path: "/projects/:projectId/preview/*",
    element: <FrontPreview />,
  },
];
