import{Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import FormCadastro from '../pages/Cadastro'
import FormLogin from '../pages/Login'
import Carrinho from '../pages/Carrinho'

const Router =() => {
    return(
        <Routes>
            <Route  path='/' element={<Home/>}/>
            <Route path="/login" element={<FormLogin/>}/>
            <Route path="/cadastro" element={<FormCadastro/>}/>
            <Route  path='/carrinho' element={<Carrinho/>}/>
            <Route path="/" exact component={Home} />
            <Route path="/carrinho" component={Carrinho} />
           
        </Routes>
    )
}

export default Router