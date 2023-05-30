import { useState } from 'react';
import Register from './components/Register';
import Sign from './components/Sign';
function Auth() {
  const [currentForm,setCurrentForm] = useState('login')
  const toggleForm = (formName)=>{
    setCurrentForm(formName)
  }
  return (
    <div className="authinication">
      {
        currentForm === 'login'? <Sign onFormToggle = {toggleForm}/> : <Register onFormToggle = {toggleForm}/>
      }
    </div>
  );
}

export default Auth;