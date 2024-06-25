import ReactDOM from "react-dom/client";
import Layout from "./Layout.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home, Register, Login } from "./page/index.ts";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";

const { Button, Input } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
    Input,
  },
});

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ChakraBaseProvider theme={theme}>
    <RouterProvider router={route} />
  </ChakraBaseProvider>
  // </React.StrictMode>,
);
