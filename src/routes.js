import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormCadastro from './pages/Cadastro';
import FormLogin from './pages/Login';
import Vitrine from './pages/Vitrine';
import Home from './pages/Home';
import Produto from './pages/Produto';


function Rotas() {
    return (
      <BrowserRouter>
        <Routes>
          <Route  path="/Home" element={Home}/>
          <Route exact path="/Login" element={FormLogin} />
          <Route path="/Cadastro" element={FormCadastro} />
          <Route path="/Vitrine" element={Vitrine} />
        </Routes>
      </BrowserRouter>
    );
  }
  

export default Rotas;