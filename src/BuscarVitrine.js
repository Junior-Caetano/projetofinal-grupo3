import React, { useEffect, useState } from 'react';
import './styles.css';
import { BsFillCartPlusFill } from 'react-icons/bs';


function BuscarVitrine() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  function selecionarProduto(produto) {
    setProdutoSelecionado(produto);
  }

  function renderDetalhesProduto() {
    if (!produtoSelecionado) {
      return null;
    }
  
    return (
    <div className="detalhes-produto">
      {produtoSelecionado.imagens.map((imagens, index) => (
        <img className='imagem-renderizacao' key={index} src={imagens.url} alt={`Imagem ${index}`} />
      ))}
      <h2 className="titulo-produto">{produtoSelecionado.nome}</h2>
      <p className="descricao-produto">{produtoSelecionado.descricao}</p>
      <p className='preco-renderizacao'> Preço: R$ {produtoSelecionado.preco.toFixed(2)}</p>
      <button className='botton-rederização-tela' onClick={() => setProdutoSelecionado(null)}>Voltar</button>

      {/* Outras informações do produto */}
    </div>
  );
}
  
  


  useEffect(() => {
    // Função assíncrona para buscar a lista de produtos na API
    async function buscarProdutos() {
      try {
        const response = await fetch('https://infracode-api.onrender.com/produtos');

        if (!response.ok) {
          throw new Error('Erro ao buscar produtos da API');
        }

        const produtosJson = await response.json();
        setProdutos(produtosJson);
      } catch (error) {
        console.error(error);
      }
    }

    buscarProdutos();
  }, []);

  if (produtos.length === 0) {
    return <div>Carregando...</div>;
  }

  if (produtoSelecionado) {
  return (
    <div>
      {renderDetalhesProduto()}
    </div>
  );
}


  return (
    <div>
      <h1 className='nome-da-loja'>Vitrine</h1>
      <div className="produto">
        {/* Renderiza a lista de produtos */}
        {produtos.map((produto) => (
          <div key={produto.id} className="produto-item" >
            <div className="image" onClick={() => selecionarProduto(produto)}>
            {/* Renderiza a primeira imagem do produto */}
            <img src={produto.imagens[1].url} alt={produto.nome} />
          </div>
            <h3 className="nome" onClick={() => selecionarProduto(produto)}>{produto.nome}</h3>
            <p className="descricao">{produto.descricao}</p>
            <p className="preco">Preço: R$ {produto.preco.toFixed(2)}</p>
            <p className='Qtde'>{produto.quantidade}</p>
            <button className="btn-carrinho" type="button">
              <BsFillCartPlusFill className="btn-icon" /> Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuscarVitrine;
