import React, { useState } from 'react'



const Sign = (props) => { 
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const handleSubmit = (e) => {
        console.log('sign in')
        e.preventDefault()
        var jsonData1 = {
            "email": email, 
            "pass": password
        }
        var formData = new FormData()
        formData.append('json1', JSON.stringify(jsonData1))
        /*
        fetch('http://-----------:8080/', {
      method: 'POST',  
      body: formData

    })
  }*/
    }  
    return (
        <div>
        <form onSubmit={handleSubmit} className = 'authinicationForm'>
            <label htmlFor = 'email'>email</label>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type = 'email'></input>
            <label htmlFor = 'password'>password</label>
            <input value={password} onChange={(e)=> setPassword(e.target.value)} type = 'password'></input>
            <button type='submit' disabled={!(email && password)}>Login</button>
        </form>
        <button onClick={() => props.onFormToggle('register')}>Don't have account? Register</button>
        </div>
    )
}

export default Sign
