import React, { useState, useEffect } from 'react';
import "./carrinho.css";
import { BsFillCartPlusFill } from 'react-icons/bs';

function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [quantidadeItensCarrinho, setQuantidadeItensCarrinho] = useState(0);
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
    if (produtoNoCarrinho) {
      const novoCarrinho = carrinho.map((item) => {
        if (item.id === produto.id) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
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

  useEffect(() => {localStorage.setItem('carrinho', JSON.stringify(carrinho));
  calcularQuantidadeItensCarrinho();
}, [carrinho]);

  return(<div className="carrinho">
      <h2>Carrinho de Compras</h2>
      {carrinho.length > 0 ? (
        <div>
          {carrinho.map((item) => (
            <div key={item.id} className="carrinho-item">
              <p>{item.nome}</p>
              <div className="carrinho-controls">
                <button className="btn-quantidade" onClick={() => removerDoCarrinho(item)}>-</button>
                <span className="quantidade">{item.quantidade}</span>
                <button className="btn-quantidade" onClick={() => adicionarAoCarrinho(item)}>+</button>
              </div>
              <p>Preço: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
              
            </div>
          ))}
          <h3>Total de produtos ({quantidadeItensCarrinho})</h3> 
          <h3>Valor Total: R$ {calcularValorTotal().toFixed(2)}</h3>
          <button className="btn-limpar" onClick={() => limparCarrinho()}>Limpar Carrinho</button>
        </div>
      ) : (
        <p>O carrinho está vazio</p>
      )}
    </div>
  );
};

export default Carrinho;