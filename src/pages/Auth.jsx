import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Registration, Login} from '../components/auth';

function Auth({currUser, setCurrUser}) {
  const [isLogin, setIsLogin] = useState(true); 

  const nav = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    setIsLogin((prevState) => !prevState);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'))

    console.log(user);

    if (user !== undefined) {
      setCurrUser(user);
      nav('/')
    }
  }, [nav, setCurrUser])

  return (
    <div className="auth__outer">
      <div className="auth__inner">
        {isLogin ? <Login callback={handleClick} setCurrUser={setCurrUser} currUser={currUser}/> : <Registration callback={handleClick} setCurrUser={setCurrUser}/>}
      </div>
    </div>
  );
}

export default Auth;
