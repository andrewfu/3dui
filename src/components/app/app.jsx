import React from "react";
import Startup from "../startup";
import { Provider } from "react-redux";
import store from "./store";

export default () => {
  return (
    <Provider store={store}>
      <Startup />
    </Provider>
  );
};
