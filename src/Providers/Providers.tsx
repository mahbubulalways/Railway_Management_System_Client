"use client";
import { AlertProvider } from "@/components/Alert/useAlert";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AlertProvider>{children}</AlertProvider>
    </Provider>
  );
};

export default Providers;
