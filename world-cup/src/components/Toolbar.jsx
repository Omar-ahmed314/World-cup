import image from '../images/logo.png'
import '../styles/Toolbar.css'

function Toolbar() {
  return (
    <div className="toolbarcontainer">
        <img src={image} alt="logo" className="logoImage"/>
        <ul className="toolbarTabs">
            <li><a href="#Home">Home</a></li>
            <li><a href="#Login">Login</a></li>
            <li><a href="#Signup">Signup</a></li>
        </ul>
    </div>
  );
}

export default Toolbar;