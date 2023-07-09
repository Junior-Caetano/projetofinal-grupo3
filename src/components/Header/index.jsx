import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom"
import "./header.css"
import { BsFillCartPlusFill } from 'react-icons/bs';


function Header() {
  const [quantidadeItensCarrinho, setQuantidadeItensCarrinho] = useState(0);
  const carrinhoSalvo = localStorage.getItem('carrinho');


    
  return (
    <header>
      <div className="header-container">
        <div className="header-container-wrap">
          <div className="logo">
            <Link to="/"><img src="/logo.png" alt="Academy Store" /></Link>
          </div>
          <nav className="nav-menu">
            <Link to="/login">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
            <Link to="/carrinho">
              <img src="/carrinho.png" alt="Carrinho" />
              <span className="quantidade-itens">{quantidadeItensCarrinho}</span>            
            </Link>
          </nav>          
        </div>
      </div>
    </header>
  );
}
export default Header;