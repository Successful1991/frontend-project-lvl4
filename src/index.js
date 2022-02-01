import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import * as filter from 'leo-profanity';
import initApp from './initApp.js';

filter.loadDictionary('ru');
filter.loadDictionary('en');

async function app() {
  const rootElement = document.getElementById('chat');
  const socket = io();
  const App = await initApp(socket, filter);
  ReactDOM.render(App, rootElement);
}

app();
