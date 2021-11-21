// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

const rootElement = document.getElementById('chat');

ReactDOM.render(<App />, rootElement);
