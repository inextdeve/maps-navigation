import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./main/MainPage";
import LoginPage from "./login/LoginPage";

import App from "./App";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
