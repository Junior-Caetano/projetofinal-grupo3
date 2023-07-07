import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BuscarVitrine from './BuscarVitrine';
import FormCadastro from './Cadastro';
import CadastroLogin from './CadastroLogin';
import FormLogin from './Login';
import Vitrine from './Vitrine';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <FormCadastro/>
    <FormLogin/>
  </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
