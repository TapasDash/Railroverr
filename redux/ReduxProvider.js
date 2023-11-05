"use client";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "./store";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>{children}</Provider>
    </PersistGate>
  );
};

export default ReduxProvider;
