import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { decodeToken } from 'react-jwt'
import useAuth from '../Hooks/useAuth'
import axios from '../axios';
import './signin.css'
import useRefreshToken from '../Hooks/useRefreshToken';

const Sign = () => { 
    const userNameRef = useRef();

    const {auth, setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [errMsg, setErrMsg] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        var signinData = {
            userName, 
            pass: password
        }
        try {
            console.log('accessToken');
            const response = await axios.post('/login', 
                JSON.stringify(signinData),
                {
                    headers: {'Content-Type' : 'application/json'},
                    withCredentials: true
                });

            // get the access token from the response header
            const accessToken = response?.data['accessToken'];
            const { userID, userName } = decodeToken(accessToken);
            // set the auth value to the userid and username
            setAuth({userID, userName, accessToken});

            // navigate back to the source page
            // TODO: replace the navigation back to the source page
            navigate(from);

        } catch (err) {
            if(!err?.response)
            setErrMsg('No Server Response');
            else if(err?.response.status === 401)
            setErrMsg('Incorrect Username or Password');
            else
            setErrMsg('Registeration Error');
        }
    }  

    return (
        <div className = 'signin_page'>
            <div className='signin_container'>
                <section className='caroselContainer'>
                    some images will be here
                </section>
                <section className='authFormContainer'>
                    <section className={errMsg ? 'errorMessage' : 'invisible'}>
                        {errMsg}
                    </section>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit} className = 'authForm'>
                        <div>
                            <label htmlFor = 'userName'>Username</label>
                            <input 
                            id='userName'
                            ref={userNameRef}
                            value={userName} 
                            onChange={(e)=> setUsername(e.target.value)} 
                            type = 'text'
                            required></input>
                        </div>
                    
                        <div>
                            <label htmlFor = 'password'>Password</label>
                            <input 
                            id='password' 
                            value={password} 
                            onChange={(e)=> setPassword(e.target.value)} 
                            type = 'password'
                            required></input>
                        </div>
                        <div>
                            <button 
                            type='submit' 
                            disabled={!(userName && password)}>Sign In</button>
                        </div>
                    </form>
                    <p>Forgotten your password?</p>
                    <br/>
                    <br/>
                    <p>Don't have an account?</p>
                    <div>
                    <Link to='/signup'><button type='button'>Register</button></Link>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Sign
