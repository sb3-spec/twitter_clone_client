import React, {useState, useRef} from 'react';
import {api} from '../../api/axios'
import {useNavigate} from 'react-router'


import './styles.css'


function Login({setCurrUser, setIsLogin}) {
    const [error, setError] = useState('');
    const usernameRef = useRef('');
    const passwordRef = useRef('');

    const nav = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        if (usernameRef.current.value.length === 0 || passwordRef.current.value.length === 0) {
            setError('Both fields must be filled in')
            return
        }

        const userData = {
            "username": usernameRef.current.value,
            "password": passwordRef.current.value
        }

        api.post('/auth/login', userData).then((response) => {
            setCurrUser(response.data)
            localStorage.setItem('loggedInUser', JSON.stringify(response.data))
            nav('/')
        }).catch((error) => {
            if (error.message.indexOf('400') !== -1) {
                setError('Incorrect username or password')
            }
        })
    }

    const switchIsLogin = () => {
        setIsLogin((prevState) => !prevState)
    }

    



    return (
        <div className="login__outer">
            <div className="login__inner">
                <h3 className="login__title">Sign in to Twitter</h3>
                <div className="login__content__outer">
                    {error && <div>{error}</div>}
                    <form onSubmit={onSubmit}>
                        <div className="form__item">
                            <label>Username</label>
                            <div className="form__container"><input className="input__field" ref={usernameRef}/></div>
                        </div>
                        <div className="form__item">
                            <label>Password</label>
                            <div className="form__container"><input className="input__field" ref={passwordRef} /></div>
                        </div>
                        <button className="submit__btn" type="submit"><h5>Login</h5></button>
                    </form>
                    <div className="auth__transition">Don't have an account?<p onClick={switchIsLogin} className="register__link">Register Here</p></div>
                </div>
            </div>
        </div>
    );
}

export default Login;
