import React, { useEffect, useState } from 'react';

function BuscarVitrine() {
  const [produtos, setProdutos] = useState([]);

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

  return (
    <div className="produto">
        
      {/* Renderiza a lista de produtos */}
      {produtos.map((produto) => (
        <div key={produto.id}>
          <div className="image">
            {/* Renderiza as imagens do produto */}
            {produto.imagens.map((imagem, index) => (
              <img key={imagem.index} src={imagem.url} alt={produto.nome} />
            ))}
          </div>
          <h3 className="nome">{produto.nome}</h3>
          <p className="preco">Preço: R$ {produto.preco}</p>
          <button className="btn-carrinho" type="button">Adicionar ao carrinho</button>
          
        </div>
      ))}
    </div>
  );
}

export default BuscarVitrine;
