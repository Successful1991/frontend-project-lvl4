import initApp from './initApp.js';
import ReactDOM from 'react-dom';
import React from 'react';
import io from 'socket.io-client';



async function app(socket) {
  const rootElement = document.getElementById('chat');

  const App = await initApp(socket);
  ReactDOM.render(App, rootElement);
}

const socket = io();

app(socket);
