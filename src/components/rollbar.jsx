import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';

const rollbarConfig = {
  accessToken: '18cb28795688419688d97d333e82211f',
  // accessToken: process.env.TOKEN_ACCESS_ROLLBAR ?? '18cb28795688419688d97d333e82211f',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const rollbarInstance = new Rollbar(rollbarConfig);

export default function RollbarProvider({ children }) {
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  return (
    <Provider config={rollbarConfig} instance={rollbarInstance}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Provider>
  );
  // }
  // return <>children</>;
}
