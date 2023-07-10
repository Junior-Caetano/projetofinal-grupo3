import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./banner.css";

function Banner() {
  const location = useLocation();
  const [excludedPages, setExcludedPages] = useState([]);

  useEffect(() => {
    // Defina as páginas que você deseja excluir do banner
    const pagesToExclude = ["/login", "/cadastro", "/carrinho"];
    setExcludedPages(pagesToExclude);
  }, []);

  const shouldRender = !excludedPages.includes(location.pathname);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="banner">
      <img src="./banner.webp" alt="Banner ofertas" />
    </div>
  );
}

export default Banner;
