import React, { useState } from 'react';

function FormCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
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
    <div className="App">
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
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
  );
}

export default FormCadastro;
