import React, { useState, useEffect, setState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import FormLogin from "../../pages/Login";

function Header() {
  const [quantidadeItensCarrinho, setQuantidadeItensCarrinho] = useState();
  const [nome, setNome] = useState("");
  const carrinhoSalvo = localStorage.getItem("carrinho");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [setIsLoggedIn] = useState(false);
  const [carrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      return JSON.parse(carrinhoSalvo);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    calcularQuantidadeItensCarrinho();
  }, [carrinho]);
  
  function calcularQuantidadeItensCarrinho() {
    let quantidade = 0;
    carrinho.forEach((item) => {
      quantidade += item.quantidade;
    });
    setQuantidadeItensCarrinho(quantidade);
  }
 
  useEffect(() => {
    const savedNome = localStorage.getItem("nome");
    if (savedNome) {
      setNome(savedNome);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    window.location.reload(true);
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-container-wrap">
          <div className="logo">
            <a href="/">
              <img src="/logo.png" alt="Academy Store" />
            </a>
          </div>
          <nav className="nav-menu">
            {isLoggedIn ? (
              <>
                <span className="nome">Bem vindo </span>
                <Link to='/' className="form-sair" onClick={handleLogout} >Sair</Link>
                <Link to="/carrinho">
                  <img src="/carrinho.png" alt="Carrinho" />
                  <span className="quantidade-itens">{quantidadeItensCarrinho}</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/cadastro">Cadastro</Link>
                <Link to="/carrinho">
                  <img src="/carrinho.png" alt="Carrinho" />
                  <span className="quantidade-itens">{quantidadeItensCarrinho}</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
