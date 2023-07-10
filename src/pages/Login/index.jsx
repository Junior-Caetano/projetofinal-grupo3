import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import Home from '../../pages/Home';

function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [nome, setNome] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const EmailChange = (event) => {
    setEmail(event.target.value);
  };

  const SenhaChange = (event) => {
    setSenha(event.target.value);
  };

  useEffect(() => {
    const savedNome = localStorage.getItem("nome");
    if (savedNome) {
      setNome(savedNome);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://infracode-api.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });
      const data = await response.json();
      console.log(data); // Exibe a resposta da API no console
      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("nome", data.nome); // Salva o nome no localStorage
        setLoginError(false);
      } else {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
        setLoginError(true);
      }
      // Limpar os campos do formulário
      setEmail('');
      setSenha('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false" ? (
        <div className="container-login">
          <div className="form-login">
            <img src='/logo.png'></img>
            <form className="login-form" onSubmit={handleSubmit}>
              <span className="form-title"> Bem vindo </span>
              {loginError && (
                <h4 className="erro-msg">Dados inválidos. Verifique seu email e senha.</h4>
              )}
              <div className="form-input">
                <label>Email</label>
                <input
                  className="input" type="email" required value={email} onChange={EmailChange} />
                <span className="focus-input" ></span>
              </div>

              <div className="form-input">
                <label>Senha</label>
                <input className="input" type="password" required value={senha} onChange={SenhaChange} />
                <span className="focus-input" ></span>
              </div>

              <div className="container-form-btn">
              <Link to='/' className="form-btn" onClick={handleSubmit} >Entrar</Link>
              </div>

              <div className="texto-center">
                <span className="texto1">Não possui conta? </span>
                <Link to='/cadastro'>Criar conta</Link> <br />
              </div>
            </form>
          </div>
        </div>

      ) : (
        <div>
        <Home/>
        </div>
      )}
    </div>
  );
}

export default FormLogin;
