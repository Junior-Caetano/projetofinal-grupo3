import React, { useEffect, useState } from 'react';
import './home.css';
import { BsFillCartPlusFill } from 'react-icons/bs';
import ReactDOM from 'react-dom';
import $ from 'jquery';

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [filtro, setFiltro] = useState('');
  const [carrinho, setCarrinho] = useState(() => {    
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      return JSON.parse(carrinhoSalvo);
    }
    return [];
  });

  function selecionarProduto(produto) {
    setProdutoSelecionado(produto);
    buscarDescricaoProduto(produto.id);
  }

  async function buscarDescricaoProduto(produtoId) {
    try {
      const response = await fetch(`https://infracode-api.onrender.com/produtos/${produtoId}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar descrição do produto na API');
      }

      const produtoJson = await response.json();
      setDescricaoProduto(produtoJson.descricao);
    } catch (error) {
      console.error(error);
    }
  }  

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);


  function adicionarAoCarrinho(produto) {
    const produtoNoCarrinho = carrinho.find((item) => item.id === produto.id);
    $('.quantidade-itens').text(parseInt($('.quantidade-itens').text())+1);
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
  
  function renderDetalhesProduto() {
    if (!produtoSelecionado) {
      return null;
    }

    return (
      <div className="detalhes-produto">
        <div className='tela-renderizacao'>
        {produtoSelecionado.imagens.map((imagens, index) => (
          <img className='imagem-renderizacao' key={index} src={imagens.url} alt={`Imagem ${index}`} />
        ))}
        </div>
        <div className='detalhes-direito'>
          <div className='titulo-h2'>
        <h2 className="titulo-produto">{produtoSelecionado.nome}</h2>
        </div>
        <p className="descricao-produto">{descricaoProduto}</p>
        <div className='detalhes-preco'>
        <p className='preco-renderizacao'> Preço: R$ {produtoSelecionado.preco.toFixed(2)}</p>
        </div>
        <button className="btn-carrinho" onClick={() => adicionarAoCarrinho(produtoSelecionado)} type="button">
                  <BsFillCartPlusFill className="btn-icon" /> Adicionar ao carrinho
                </button>
            </div>
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
  
        const produtosFiltrados = produtosJson.filter(produto =>
          produto.nome.toLowerCase().includes(filtro.toLowerCase())
        );
  
        setProdutos(produtosFiltrados);
      } catch (error) {
        console.error(error);
      }
    }
  
    buscarProdutos();
  }, [filtro]);
  
 
  if (produtoSelecionado) {
    return (
      <div>
        {renderDetalhesProduto()}
      </div>
    );
  }

  return (
    <div className='container'>
    <div className='pesquisa'>
      <h1 className='nome-da-loja'>Nosso produtos</h1>
      <div className='nome-da-loja'>
      <input  type="text"  value={filtro}  onChange={e => setFiltro(e.target.value)}  placeholder="Pesquisar produto"  className="barra-pesquisa"/>
    </div>   
    </div>
      <div className="center">
        <div className="produto">
          {/* Renderiza a lista de produtos */}
          {produtos.map((produto) => (
            <div key={produto.id} className="produto-item">
              <div className="image" onClick={() => selecionarProduto(produto)}>
                {/* Renderiza a primeira imagem do produto */}
                <img src={produto.imagens[1].url} alt={produto.nome} />
              </div>
              <h3 className="nome" onClick={() => selecionarProduto(produto)}>{produto.nome}</h3>
              <p className="descricao">{produto.descricao}</p>
              <p className="preco">Preço: R$ {produto.preco.toFixed(2)}</p>       
                <button className="btn-carrinho" onClick={() => adicionarAoCarrinho(produto)} type="button">
                  <BsFillCartPlusFill className="btn-icon" /> Adicionar ao carrinho
                </button>
              
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Home;
