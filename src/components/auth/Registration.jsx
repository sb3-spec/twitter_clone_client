import {useState} from 'react';
import {api} from '../../api/axios'
import {isNumeric, hasNumbers, hasSpecialCharacters} from '../../utility'

function Registration({setCurrUser, setIsLogin}) {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (!usernameCheck() || !passwordCheck() || !allFieldsPopulated()) {return}

    let newUserData = {
      username: username.trim(),
      password: password.trim(),
      email: email.trim(),
    }

    api.post('/auth/register', newUserData).then((response) => {
      response && setCurrUser(response.data);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data))
    }).catch((error) => {
      if (error.response) {
        setError(error.response.data['error']);
      }  
    })
  }
  const spaceRegex = /\s/
  const passwordCheck = () => {
    if (passwordConfirm !== '' && password !== passwordConfirm) {
      setError('Passwords must match')
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }

    if (isNumeric(password) || !hasNumbers(password) || !hasSpecialCharacters(password)) {
      setError('Password must contain numbers, characters, and letters')
      return false
    }

    if (spaceRegex.test(password.trim())) {
      setError('Password may not contain spaces')
      return false;
    }

    return true
  }

  const usernameCheck = () => {
    if (username.length < 3) {
      setError('Username must be at least 3 letters')
      return false;
    }

    if (isNumeric(username)) {
      setError('Username cannot be only numbers')
      return false;
    }
    
    if (spaceRegex.test(username.trim())) {
      setError('Username may not contain spaces')
      return false;
    }

    return true;
  }

  const allFieldsPopulated = () => {
    if (username === '') {
      setError('Username must not be empty')
      return false
    } else if (password === '') {
      setError('Password must not be empty')
      return false
    } else if (email === '') {
      setError('Email must not be empty')
      return false
    }
    return true
  }

  const switchIsLogin = () => {setIsLogin((prevState) => !prevState)}

  const handleChange = (func, event) => {func(event.target.value)}
  
  return (
    <div className="login__outer">
        <div className="login__inner">
            <h3 className="login__title">Sign Up</h3>
            <div className="login__content__outer">
                {error && <div>{error}</div>}
                <form onSubmit={onSubmit}>
                    <div className="form__item">
                        <label>Username</label>
                        <div className="form__container"><input onChange={((event) => handleChange(setUsername, event))} className="input__field" type="text"/></div>
                    </div>
                    <div className="form__item">
                        <label>Email</label>
                        <div className="form__container"><input onChange={((event) => handleChange(setEmail, event))} className="input__field" type="text" /></div>
                    </div>
                    <div className="form__item">
                        <label>Password</label>
                        <div className="form__container"><input onChange={((event) => handleChange(setPassword, event))} className="input__field" type="text" /></div>
                    </div>
                    <div className="form__item">
                        <label>Confirm Password</label>
                        <div className="form__container"><input onChange={((event) => handleChange(setPasswordConfirm, event))} className="input__field" type="text" /></div>
                    </div>
                    <button className="submit__btn" type="submit"><h5>Sign Up</h5></button>
                </form>
                <div className="auth__transition">Have an account?<p onClick={switchIsLogin} className="register__link">Login Here</p></div>
            </div>
        </div>
    </div>
  );
}

export default Registration;
