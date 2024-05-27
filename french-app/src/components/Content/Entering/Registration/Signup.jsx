import { useState } from 'react';
import signup from './Signup.module.css'
import { useEffect } from 'react';

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState("E-mail field can't be empty")
    const [passwordError, setPasswordError] = useState("Password field can't be empty")
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        }else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('E-mail does not exist')
        } else {
            setEmailError('')
        }
    }    

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length < 5 || e.target.value.length > 10) {
            setPasswordError('Password must be 5 to 10 digits')
        } else if(!e.target.value) {
            setPasswordError("Password field can't be empty")
        } else (
            setPasswordError('')
        )
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    return(
        <div className={signup.signup}>
            <div className={signup.signup__header}>
                <h1>Hello, student</h1>
                <p>start your registration!</p>
            </div>
            <div className={signup.signup__forms}>
                <input name='user name' type='text' placeholder='user name'></input>
                {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
                <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type='text' placeholder='e-mail'></input>
                {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
                <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='password'></input>
                <div className={signup.signup__forms_buttons}>
                    <button className={signup.signup__forms_back}>Come back</button>
                    <button disabled={!formValid} className={signup.signup__forms_signup} type='submit'>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;