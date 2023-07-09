import React, { useState, useEffect } from 'react';
import "./carrinho.css";


const Checkout = () => {
  const [itens, setItens] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const addItem = (item) => {
    const itemExistente = itens.find((it) => it.id === item.id);
    if (itemExistente) {
      const novosItens = itens.map((it) =>
        it.id === item.id ? { ...it, quantidade: it.quantidade + 1 } : it
      );
      localStorage.setItem('cart', JSON.stringify(novosItens));
      setItens(novosItens);
    } 
    else {
      const novoCarrinho = [...itens, item];
      localStorage.setItem('cart', JSON.stringify(novoCarrinho));
      setItens(novoCarrinho);
    }

    calcularTotal();
  };

  const removeItem = (index) => {
    const novosItens = [...itens];
    if (novosItens[index].quantidade > 1) {
      novosItens[index].quantidade -= 1;
    } else {
      novosItens.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(novosItens));
    calcularTotal();
    setItens(novosItens);
  };

  const calcularTotal = () => {
    let newTotal = 0;
    let newQtd = 0;
    let cart = localStorage.getItem('cart');

    if (cart) {
      cart = JSON.parse(cart);
      for (let i = 0; i < cart.length; i++) {
        newTotal += parseFloat(cart[i].preco) * parseInt(cart[i].quantidade);
        newQtd += parseInt(cart[i].quantidade);
      } 
    }

    setCartCount(newQtd);
    setTotal(newTotal);
  };

  useEffect(() => {
    const carrinhoItens = localStorage.getItem('cart');
    if (carrinhoItens) {
      setItens(JSON.parse(carrinhoItens));
      calcularTotal();
    }
  }, []);

  const options = {style: "currency", currency: "BRL"};

  return (
         <div className='cart-container'>
        <h2>Carrinho de Compras</h2>
        <ul>
          <div className="header">
            <p style={{width: '150px'}}>Imagem</p>
            <p style={{width: '300px'}}>Nome do Produto</p>
            <p style={{width: '200px', textAlign: 'center'}}>Qtd</p>
            <p style={{width: '200px', textAlign: 'center'}}>Valor</p>
            <p style={{width: '200px', textAlign: 'center'}}>Subtotal</p>
          </div>
          {itens.length > 0 && 
            <>
              {itens.map((item, index) => (
                <li key={index}>
                  <div className='image' style={{width: '150px'}}>
                    <img loading='lazy' style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px'}} src={item.image} alt={item.nome}/>
                  </div>
                  <div className='name' style={{width: '300px'}}>
                    <h4>{item.nome}</h4>
                  </div>
                  <div className='qtd' style={{width: '200px'}}>
                    <span onClick={() => removeItem(index)}>
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </span>
                      <input type="text" readOnly placeholder='00' value={item.quantidade}/>
                      <span onClick={() => addItem(item)}>
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </span>
                  </div>
                  <div className='value' style={{width: '200px', textAlign: 'center'}}>
                    R$ {item.preco.toLocaleString("pt-BR", options)}
                  </div>
                  <div className='subtotal' style={{width: '200px', textAlign: 'center'}}>
                    R$ {(item.preco * item.quantidade).toLocaleString("pt-BR", options)}
                  </div>
                </li>
              ))}
            </>
          }
        </ul>
        <p style={{fontWeight: 'bold'}}>
          <span style={{display: 'inline-block', width: '880px', textAlign: 'right'}}>Total</span>
          <span style={{display: 'inline-block', width: '270px', textAlign: 'right'}}> {total.toLocaleString("pt-BR", options)}</span>
        </p>
      </div> 
  );
};

export default Checkout;