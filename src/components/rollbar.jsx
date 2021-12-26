import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';

const TOKEN_ACCESS_ROlLBAR = "18cb28795688419688d97d333e82211f";
const rollbarConfig = {
  accessToken: TOKEN_ACCESS_ROlLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: "production"
  }
};
const rollbarInstance = new Rollbar(rollbarConfig);

export default function RollbarProvider({children}) {
  return (<Provider config={rollbarConfig} instance={rollbarInstance}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Provider>);
};
