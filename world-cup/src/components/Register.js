import React, { useState } from 'react'

const Register = (props) => { 
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [birthDate,setBirthDate] = useState('')
    const [gender,setGender] = useState('')
    const [nationality,setNationality] = useState('')
   
    const handleSubmit = (e) => {
        console.log('sign up')
        e.preventDefault()
        var jsonData1 = {
            'firstName': firstName,
            'lastName': lastName,
            'userName': firstName+lastName,
            'birthDate': birthDate,
            'nationality': nationality,
            'gender':gender,
            "email": email, 
            "pass": password,
            'userRole': 'guest'
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
            <label htmlFor = 'firstName'>first name</label>
            <input value={firstName} onChange={(e)=> setFirstName(e.target.value)} type = 'text'></input>
            <label htmlFor = 'lastName'>last name</label>
            <input value={lastName} onChange={(e)=> setLastName(e.target.value)} type = 'text'></input>
            <label htmlFor = 'password'>password</label>
            <input value={password} onChange={(e)=> setPassword(e.target.value)} type = 'password'></input>
            <label htmlFor = 'nationality'>nationality</label>
            <input value={nationality} onChange={(e)=> setNationality(e.target.value)} type = 'text'></input>
            <label htmlFor = 'date'>Birth date</label>
            <input value={birthDate} onChange={(e)=> setBirthDate(e.target.value)} type = 'date'></input>
            <label htmlFor = 'gender'>gender</label>
            <select value={gender} onChange={(e)=> setGender(e.target.value)}>
                <option value="">--choose--</option>
                <option value={'male'}>male</option>
                <option value={'female'}>female</option>
            </select>
            <button type='submit' disabled={!(email && firstName && lastName && password && gender && nationality && birthDate)}>SignUp</button>
        </form>
        <button onClick={() => props.onFormToggle('login')}>already have account? Sign in</button>
        </div>
    )
}

export default Register
