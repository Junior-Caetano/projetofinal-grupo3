import React, { useState } from 'react';

function CadastroLogin() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleCadastroSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://infracode-api.onrender.com/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });
      const data = await response.json();
      console.log(data); // Exibe a resposta da API no console
      // Limpar os campos do formulário
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSubmit = async (event) => {
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
      } else {
        setIsLoggedIn(false);         
      }
      // Limpar os campos do formulário
      setEmail('');
      setSenha('');
    } catch (error) {
      console.error(error);
    }    
  };  

  return (
    <div className="formulario">
      <h1>Cadastro e Login de Usuário</h1>

      {!isLoggedIn ? (
        <div>
          <div className="cadastro">
              <h2>Cadastro</h2>
              <form onSubmit={handleCadastroSubmit}>
                <label>
                  Nome: 
                  <input type="text" value={nome} onChange={handleNomeChange} />
                </label>
                <label>
                  Email: 
                  <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                  Senha:
                  <input type="password" value={senha} onChange={handleSenhaChange} />
                </label>
                <button type="submit">Cadastrar</button>
              </form>
            </div>
            <div className="login">
              <h2>Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <label>
                  Email:
                  <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                  Senha:
                  <input type="password" value={senha} onChange={handleSenhaChange} />
                </label>
                <button type="submit">Login</button>                             
              </form>
            </div>
        </div> 
      ) : (  
        <form>     
          <label>
            <h2>Você está logado!</h2>
            <button type="submit">Sair</button>   
          </label>
        </form>       
      )}
    </div>    
  );
}

export default CadastroLogin;
