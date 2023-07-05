import React, { useEffect, useState } from 'react';
import './styles.css';

function BuscarId() {
  const [produto, setDados] = useState();
  
  useEffect(() => {
    // Função para buscar os dados da API
    async function buscarDados() {
      try {
        const id = 5; // ID do item que você deseja buscar
        const response = await fetch(`https://infracode-api.onrender.com/produtos/${id}`);
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados da API');
        }

        const produtoJson = await response.json();
        setDados(produtoJson);
      } catch (error) {
        console.error(error);
      }
    }

    buscarDados();
  }, []);

  if (!produto) {
    return <div>Carregando...</div>;
  }  
  
}
export default BuscarId;
