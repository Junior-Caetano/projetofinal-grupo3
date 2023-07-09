import React, { useState, useEffect } from 'react';
import { BsFillCartPlusFill } from 'react-icons/bs';
import "./carrinho.css";


function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [quantidadeItensCarrinho, setQuantidadeItensCarrinho] = useState(0);
  const [quantidadeLimite, setQuantidadeLimite] = useState({});
  const [carrinho, setCarrinho] = useState(() => {    
  const carrinhoSalvo = localStorage.getItem('carrinho');
  

    if (carrinhoSalvo) {
      return JSON.parse(carrinhoSalvo);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  function limparCarrinho() {
    setCarrinho([]);
    localStorage.removeItem('carrinho');
  }
  function adicionarAoCarrinho(produto) {
    const produtoNoCarrinho = carrinho.find((item) => item.id === produto.id);
    const quantidadeLimite = quantidadeLimite[produto.id];
  
    if (produtoNoCarrinho) {
      if (produtoNoCarrinho.quantidade < quantidadeLimite) {
        const novoCarrinho = carrinho.map((item) => {
          if (item.id === produto.id) {
            return { ...item, quantidade: item.quantidade + 1 };
          }
          return item;
        });
        setCarrinho(novoCarrinho);
      } else {
        console.log('Quantidade limite atingida para o produto');
      }
    } else {
      if (quantidadeLimite > 0) {
        setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
      } else {
        console.log('Quantidade limite atingida para o produto');
      }
    }
  }
  function removerDoCarrinho(produto) {
    const produtoNoCarrinho = carrinho.find((item) => item.id === produto.id);
    if (produtoNoCarrinho && produtoNoCarrinho.quantidade > 1) {
      const novoCarrinho = carrinho.map((item) => {
        if (item.id === produto.id) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
        return item;
      });
      setCarrinho(novoCarrinho);
    } else {
      const novoCarrinho = carrinho.filter((item) => item.id !== produto.id);
      setCarrinho(novoCarrinho);
    }
  }
  function calcularValorTotal() {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }

  function calcularQuantidadeItensCarrinho() {
    let quantidade = 0;
    carrinho.forEach((item) => {
      quantidade += item.quantidade;
    });
    setQuantidadeItensCarrinho(quantidade);
  }

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    calcularQuantidadeItensCarrinho();
  }, [carrinho]);

    return (
    <div>
      <h1>Carrinho de Compras</h1>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          {carrinho.map((produto) => (
            <div key={produto.id}>
              <h3>{produto.nome}</h3>
              <p>Preço: R$ {produto.preco.toFixed(2)}</p>
              <p>Quantidade: {produto.quantidade}</p>
              <div className="carrinho-controls">
                  <button className="btn-quantidade" onClick={() => removerDoCarrinho(produto)}>-</button>
                  <span className="quantidade">{carrinho.find((item) => item.id === produto.id).quantidade}</span>
                  <button className="btn-quantidade" onClick={() => adicionarAoCarrinho(produto)}>+</button>
                </div>          
            </div>
            
          ))}
          <h3>Total de produtos ({quantidadeItensCarrinho})</h3>     
         <h3>Valor Total: R$ {calcularValorTotal().toFixed(2)}</h3>

         <button className="btn-limpar" onClick={() => limparCarrinho()}>Limpar Carrinho</button>
        </div>
      )}
    </div>
  );
}

export default Carrinho;