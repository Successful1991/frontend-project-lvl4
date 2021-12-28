import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';

const rollbarConfig = {
  // accessToken: TOKEN_ACCESS_ROLLBAR, //так не работает
  accessToken:  '18cb28795688419688d97d333e82211f', //TOKEN_ACCESS_ROLLBAR,
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
