import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router'
import {Login, Registration} from './'


function Auth({setCurrUser, currUser}) {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {

        if (currUser !== undefined) {return}

        const user = JSON.parse(localStorage.getItem('loggedInUser'))

        user && setCurrUser(user.user)
        

        currUser === undefined && navigate('/')
    }, [currUser, navigate, setCurrUser]);

    return (
        <div>{isLogin ? <Login setIsLogin={setIsLogin} setCurrUser={setCurrUser}/> : 
        <Registration setIsLogin={setIsLogin} setCurrUser={setCurrUser}/>}</div>
    )
}

export default Auth