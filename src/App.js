import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.less";
import Login from "./Componants/Login";
import { PrivateRoute, RestrictedRoutes } from "./helper/ProtectedRoute";
import AllRoutes from "./routes/index";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RestrictedRoutes />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/*" element={<AllRoutes />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
