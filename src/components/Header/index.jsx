import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import FormLogin from "../../pages/Login";

function Header() {
  const [quantidadeItensCarrinho, setQuantidadeItensCarrinho] = useState(0);
  const carrinhoSalvo = localStorage.getItem("carrinho");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [setIsLoggedIn] = useState(false);
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      return JSON.parse(carrinhoSalvo);
    }
    return [];
  });

  function calcularQuantidadeItensCarrinho() {
    let quantidade = 0;
    carrinho.forEach((item) => {
      quantidade += item.quantidade;
    });
    setQuantidadeItensCarrinho(quantidade);
  }

  function adicionarItemAoCarrinho(item) {
    const novoCarrinho = [...carrinho, item];
    setCarrinho(novoCarrinho);
  }

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    calcularQuantidadeItensCarrinho();
  }, [carrinho]);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-container-wrap">
          <div className="logo">
            <Link to="/">
              <img src="/logo.png" alt="Academy Store" />
            </Link>
          </div>
          <nav className="nav-menu">
            {isLoggedIn ? (
              <>
                <span>Olá XXX</span>
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
