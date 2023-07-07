import React, { useState } from 'react';
import "./index.css";

function FormLogin(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);

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
            {!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false" ?  (
          <div className="container-login">
            <div className="form-login">
              <form className="login-form" onSubmit={handleSubmit}>
                <span className="form-title"> Bem vindo </span>
                {loginError && (
                  <h4 className="erro-msg">Dados inválidos. Verifique seu email e senha.</h4>
                )}                    
                <div className="form-input">
                  <label>Email</label>
                  <input
                    className="input" type="email" required value={email} onChange={EmailChange}/>
                  <span className="focus-input" ></span>
                </div>
    
                <div className="form-input">
                  <label>Senha</label>
                  <input className="input" type="password" required value={senha} onChange={SenhaChange}/>
                  <span className="focus-input" ></span>
                </div>
    
                <div className="container-form-btn">
                  <button className="form-btn">Entrar</button>
                </div>
    
                <div className="texto-center">
                  <span className="texto1">Não possui conta? </span>
                  <a className="texto2" href="#">
                    Criar conta
                  </a>
                </div>
              </form>
            </div>
          </div>
    
        ) : (  
            <form>     
              <label>
                <h2>Você está logado!</h2>
                <button className="form-btn" onClick={handleLogout} >Sair</button>   
              </label>
            </form>       
          )}
        </div> 
    ); 
  
}


export default FormLogin;