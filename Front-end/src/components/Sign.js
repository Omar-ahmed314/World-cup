import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import useAuth from '../Hooks/useAuth';
import useAxiosPrivate from '../Hooks/useAxiosPrivate.js';
import './signin.css';

const Sign = () => {
  const userNameRef = useRef();

  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [errMsg, setErrMsg] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var signinData = {
      userName,
      pass: password,
    };
    try {
      const response = await axiosPrivate.post('/login', signinData);
      //JSON.stringify(signinData)
      // The use is pending approval
      if (response.status === 202 && response.data['status'] === 'pending') {
        setWarningMsg('Pending Approval');
        return;
      }

      // get the access token from the response header
      const accessToken = response?.data['accessToken'];
      const { userID, userName, role, roleApproved } = decodeToken(accessToken);
      // set the auth value to the userid and username
      setAuth({ userID, userName, role, roleApproved, accessToken });

      if (role === 'admin') {
        navigate('/dashboard', { replace: true });
      } else {
        // navigate back to the source page
        // TODO: replace the navigation back to the source page
        navigate(from);
      }
    } catch (err) {
      if (!err?.response) setErrMsg('No Server Response');
      else if (err?.response.status === 401)
        setErrMsg('Incorrect Username or Password');
      else setErrMsg('Registeration Error');
    }
  };

  return (
    <div className="signin_page">
      <div className="signin_container">
        <section className="caroselContainer">some images will be here</section>
        <section className="authFormContainer">
          <section className={errMsg ? 'errorMessage' : 'invisible'}>
            {errMsg}
          </section>
          <section className={warningMsg ? 'warningMessage' : 'invisible'}>
            {warningMsg}
          </section>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className="authForm">
            <div>
              <label htmlFor="userName">Username</label>
              <input
                id="userName"
                ref={userNameRef}
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
              ></input>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              ></input>
            </div>
            <div>
              <button type="submit" disabled={!(userName && password)}>
                Sign In
              </button>
            </div>
          </form>
          <p>Forgotten your password?</p>
          <br />
          <br />
          <p>Don't have an account?</p>
          <div>
            <Link to="/signup">
              <button type="button">Register</button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sign;
