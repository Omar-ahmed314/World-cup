import { Link } from 'react-router-dom';
import image from '../../images/logo.png'
import effect from '../../images/texture.png'
import '../../styles/Home/Toolbar.css'

function Toolbar() {
  return (
    <div className="toolbar_container">
      <img src={effect} alt="effect" className='effect'/>
      <img src={image} alt="logo" className="logo_image"/>
      <ul className="toolbar_tabs">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/'>Login</Link></li>
          <li><Link to='/'>Signup</Link></li>
      </ul>
    </div>
  );
}

export default Toolbar;
