import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';

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
