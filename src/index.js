import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import initApp from './initApp.js';

async function app() {
  const rootElement = document.getElementById('chat');
  const socket = io();
  const App = await initApp(socket);
  ReactDOM.render(App, rootElement);
}

app();
