import React from "react";
import loadable from "@loadable/component";
// import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Curr = loadable(() => import("./pages"));

const RenderComponents = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/currencyConverter"} element={<Curr />} />
        </Routes>
      </Router>
    </>
  );
};
export default RenderComponents;
