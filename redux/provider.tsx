"use client";

import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate as PersistGateClient } from "redux-persist/integration/react";

// type Provider = InstanceType<typeof Provider>;

function PersistGateServer({ children }: {
  children: React.ReactNode;
}) {
  return children;
}

export function Providers({ children }: any) {
  let runtime = process.env.RUNTIME;
  let PersistGate: any = PersistGateServer;
  if (runtime === "browser") {
    PersistGate = PersistGateClient;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
