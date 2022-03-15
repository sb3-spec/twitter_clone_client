import React from 'react'
import {api} from '../../api/axios'
import Cookies from 'js-cookie'

import './styles.css'

function Logout({setCurrUser}) {

    const handleClick = (event) => {
        // event.preventDefault();
        // api.get('/auth/logout').then((response) => {
        //     setCurrUser(null)
        //     localStorage.removeItem('loggedInUser');
        //     sessionStorage.removeItem('sessionid');
        // }).catch((err) => {
        //     console.log(err)
        // })
        Cookies.remove('sessionid')
        localStorage.removeItem('loggedInUser')
        window.location.reload()
    }



  return (
    <div className='logout__outer'>
        <button onClick={handleClick} className='btn__logout' type="button">Logout</button>
    </div>
  )
}

export default Logout