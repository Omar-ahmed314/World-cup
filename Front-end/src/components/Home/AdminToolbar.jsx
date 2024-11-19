import { Link, useLocation, useNavigate } from 'react-router-dom';
import image from '../../images/logo.png'
import effect from '../../images/texture.png'
import useAuth from '../../Hooks/useAuth';
import '../../styles/Home/Toolbar.css'
import { Fragment, useState } from 'react';
import { faCircleUser, faUser, faGear, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLogout from '../../Hooks/useLogout';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const AdminToolbar = ({togglePanel}) => {
  const {auth} = useAuth();

  const [visible, setVisibility] = useState(false);
  const [isSignedIn, setSignedIn] = useState(auth ? true : false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();

  const toggleDropdownList = () => {
    setVisibility(!visible);
  }

  const signout = async () => {

    try {
      await logout();
      window.location.reload();
      
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className="toolbar_container">
        <FontAwesomeIcon icon={faBars} size='lg' style={{cursor: 'pointer'}} onClick={() => togglePanel()}/>
      {/* <img src={effect} alt="effect" className='effect'/> */}
      <img src={image} alt="logo" className="logo_image"/>
      <ul className="toolbar_tabs">
          <li><Link to='/'>Home</Link></li>
          
          {
            isSignedIn ? (
              <Fragment>
                <li><Link to='/reserved_matches'>Reserved Matches</Link></li>
                <li>
                  <div 
                  className='user-box-wrap' 
                  onClick={toggleDropdownList}>
                    <div className='user-icon'>
                      <FontAwesomeIcon icon={faCircleUser} size='2xl'/>
                    </div>
                    <div className={'user-drop-down-list '.concat(visible ? 'visible' : 'hidden')}>
                      <span>{auth?.userName}</span>
                      <ul>
                        <li><div className="icon"><FontAwesomeIcon icon={faUser} /></div><div className="description">Profile</div></li>
                        <li><div className="icon"><FontAwesomeIcon icon={faGear} /></div><div className="description">Settings & Privacy</div></li>
                        <li><div className="icon"><FontAwesomeIcon icon={faFileContract} /></div><div className="description">Terms of Agreement</div></li>
                      </ul>
                      <button onClick={signout}>logout</button>
                    </div>
                  </div>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Signup</Link></li>
              </Fragment>
            )
          }
      </ul>
    </div>
  );
}

export default AdminToolbar;
