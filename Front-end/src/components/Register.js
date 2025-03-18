import React, { Fragment, useEffect, useRef, useState } from 'react';
import './signup.css';
import { countries } from '../flags';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const Register = (props) => {
  const firstNameRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [step, setStep] = useState(1);

  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validUserName, setValidUserName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmedPassword, setValidConfirmedPassword] = useState(true);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(USER_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(USER_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [userName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidConfirmedPassword(password === confirmedPassword);
  }, [confirmedPassword]);

  const handleSubmit = async (e) => {
    console.log('sign up');
    e.preventDefault();
    let signupData = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      birthDate: birthDate,
      nationality: nationality,
      gender: gender,
      email: email,
      pass: password,
      userRole: 'fan',
    };
    try {
      const response = await axios.post('/user', JSON.stringify(signupData), {
        headers: { 'Content-Type': 'application/json' },
      });
      navigate(from);
    } catch (error) {
      if (!error?.response) setErrMsg('No Server Response');
      else if (error.response.status === 400) setErrMsg('User Already Exist');
      else setErrMsg('Internal Error');
    }
  };

  return (
    <div className="signup_page">
      <div className="signup_container">
        <section className="carosel-container"></section>
        <section className="authFormContainer">
          <section className={errMsg ? 'errorMessage' : 'invisible'}>
            {errMsg}
          </section>
          <h1>Sign Up</h1>
          <h4>Step {step} of 2</h4>
          <form onSubmit={handleSubmit} className="authForm">
            {step === 1 ? (
              <Fragment>
                <div>
                  <label htmlFor="firstName">First name</label>
                  <input
                    id="firstName"
                    ref={firstNameRef}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    required
                  ></input>
                  <span
                    className={
                      firstName && !validFirstName
                        ? 'inputErrorMsg'
                        : 'invisible'
                    }
                  >
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp; 4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens are allowed.
                  </span>
                </div>

                <div>
                  <label htmlFor="lastName">Last name</label>
                  <input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    required
                  ></input>
                  <p
                    className={
                      lastName && !validLastName ? 'inputErrorMsg' : 'invisible'
                    }
                  >
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens are allowed.
                  </p>
                </div>

                <div>
                  <label htmlFor="userName">Username</label>
                  <input
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    required
                  ></input>
                  <p
                    className={
                      userName && !validUserName ? 'inputErrorMsg' : 'invisible'
                    }
                  >
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens are allowed.
                  </p>
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  ></input>
                  <span
                    className={
                      email && !validEmail ? 'inputErrorMsg' : 'invisible'
                    }
                  >
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Invalid Email Address.
                    <br />
                  </span>
                </div>

                <div>
                  <label htmlFor="nationality">Nationality</label>
                  <select
                    id="nationality"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    type="text"
                  >
                    {countries.map((country, i) => {
                      return (
                        <option value={country} key={i}>
                          {country}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label htmlFor="date">Birth date</label>
                  <input
                    id="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    type="date"
                  ></input>
                </div>

                <div>
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" defaultChecked>
                      choose
                    </option>
                    <option value={'male'}>male</option>
                    <option value={'female'}>female</option>
                  </select>
                </div>

                <div>
                  <button
                    id="continueButton"
                    onClick={(e) => setStep(2)}
                    disabled={
                      !(
                        userName &&
                        email &&
                        firstName &&
                        lastName &&
                        gender &&
                        nationality &&
                        birthDate
                      )
                    }
                  >
                    Continue
                  </button>
                </div>

                <div>
                  <span id="alreadySignButton">
                    Already have account? <Link to="/login">Sign in</Link>
                  </span>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  ></input>
                  <span
                    className={
                      password && !validPassword ? 'inputErrorMsg' : 'invisible'
                    }
                  >
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;8 to 24 characters.
                    <br />
                    Must Contain at least one capital alphabet.
                    <br />
                    at least one number. <br />
                    at least one special character !@#$% .<br />
                  </span>
                </div>

                <div>
                  <label htmlFor="confirmedPassword">Confirm Password</label>
                  <input
                    id="confirmedPassword"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    type="password"
                  ></input>
                  <span
                    className={
                      confirmedPassword && !validConfirmedPassword
                        ? 'inputErrorMsg'
                        : 'invisible'
                    }
                  >
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Not Matching.
                    <br />
                  </span>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={
                      !(password && confirmedPassword && validConfirmedPassword)
                    }
                  >
                    SignUp
                  </button>
                </div>
              </Fragment>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
