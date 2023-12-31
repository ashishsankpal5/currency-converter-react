import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const CurrencyConverterScreen = loadable(() => import("./curr_converter"));

const CurrencyConverter = () => {
  return (
    <>
      {/* <Router>
        <Routes>
          <Route
            path={"/currencyConverterScreen"}
            element={<CurrencyConverterScreen />}
          />
        </Routes>
      </Router> */}
      <CurrencyConverterScreen/>
    </>
  );
};
export default CurrencyConverter;
