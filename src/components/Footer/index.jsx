import { Link } from 'react-router-dom'
import AnoFooter from "../AnoFooter";
import './footer.css'

function Footer() {
  return (
    <footer> 
      <div className="footer-container">
        <img className='footer-img' src="/logo-white.png" alt="Academy Store" />
        <p>O melhor em tecnologia!</p>  

        <div className="footer-container-wrap">
          <div>
            <h3>INSTITUCIONAL</h3>
            <span>Quem somos</span>
            <span>Termos de uso</span>
            <span>Política de privacidade</span>
            <span>Termos de garantia</span>
          </div>
          <div>
            <h3>DÚVIDAS</h3>
            <span>Como comprar</span>
            <span>Prazos e entregas</span>
            <span>Formas de pagamento</span>
            <span>Trocas e devoluções</span>
          </div>
          <div>
            <h3>Fale conosco</h3>
            <span>Das 08h às 18h</span>
            <span>+ 55 (11) 91111-1111</span>
            <span>sac@academystore.com.br</span>
          </div>
        </div>

        <div className='copyright'>
          <p>&copy; <AnoFooter/> Academy Store - Todos os direitos reservados</p>
        </div>
      </div>      
    </footer>
  );
}
export default Footer;