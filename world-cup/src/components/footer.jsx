import '../styles/footer.css'
import adidas from '../images/adidas.png'
import visa from '../images/visa.png'
import cocacola from '../images/cocacola.png'

function Footer() {
  return (
    <div className="footerSlot">
        <div className='footerHeader'>
            <h2>FIFA<sup>&reg;</sup></h2>
        </div>
        <div className='sponsers'>
            <div className='sponsersHeader'><h2>Sponsers</h2></div>
            <div className='sponsersList'>
                <img src={adidas}/>
                <img src={cocacola}/>
                <img src={visa}/>
            </div>
        </div>
        <div className='footerFooter'>
            <ul>
                <li><span>Privacy Policy</span></li>
                <li>Terms Of Service</li>
                <li>Advertise</li>
                <li>Manage Cookie Preference</li>
            </ul>
            <p>Copyrights 1994 - 2022 FIFA. ALL rights reserved.</p>
        </div>
    </div>
  );
}

export default Footer;
