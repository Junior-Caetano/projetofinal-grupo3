import React, { useState } from 'react';

function FormCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const NomeChange = (event) => {
    setNome(event.target.value);
  };

  const EmailChange = (event) => {
    setEmail(event.target.value);
  };

  const SenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = async (event) => {
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

  return (
    <div className="container">
      <div className="container-login">
            <div className="form-login">
            <span className="form-title"> Cadastrar </span>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-input">
                  <label>Nome:</label>
                  <input className="input"  type="text" required value={nome} onChange={NomeChange} /> 
                  <span className="focus-input" ></span>  
                </div> 
                <div className="form-input">   
                  <label>Email:</label>
                  <input className="input" type="email" required value={email} onChange={EmailChange} />
                  <span className="focus-input" ></span>
                </div>
                <div className="form-input">       
                  <label>Senha:</label>
                  <input className="input"  type="password" required value={senha} onChange={SenhaChange} />
                  <span className="focus-input" ></span>
                </div>        
                <div className="container-form-btn">
                  <button type="submit" className="form-btn">Cadastrar</button>
                </div>
                <div className="texto-center">
                  <span className="texto1">Já possui conta? </span>
                  <a className="texto2" href="#">
                    Entrar
                  </a>
                </div>
              </form>
            </div>
       </div>
    </div>
    
  );
}

export default FormCadastro;
