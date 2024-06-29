import ReactDOM from "react-dom/client";
import Layout from "./Layout.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home, Register, Login, Notes } from "./page/index.ts";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";

import store from "./store/store.ts";
import { Provider } from "react-redux";

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
      <Route path="/notes" element={<Notes />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ChakraBaseProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </ChakraBaseProvider>
  // </React.StrictMode>,
);
