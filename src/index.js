import initApp from './initApp.js';
import ReactDOM from 'react-dom';
import React from 'react';
import io from 'socket.io-client';



async function app() {
  const rootElement = document.getElementById('chat');
  const socket = io();
  const App = await initApp(socket);
  ReactDOM.render(App, rootElement);
}

app();
