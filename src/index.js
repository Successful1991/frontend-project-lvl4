// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/app.jsx';
import Login from './components/login.jsx';
import NotFound from './NotFound.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

const rootElement = document.getElementById('chat');

ReactDOM.render(<BrowserRouter>
  <Routes>
    <Route path='/' element={<App />}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='*' element={<NotFound />}></Route>
  </Routes>

</BrowserRouter>, rootElement);
