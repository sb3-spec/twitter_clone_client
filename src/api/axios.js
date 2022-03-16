import axios from "axios";
import Cookies from 'js-cookie'

// 'https://twitter-clone-drf.herokuapp.com'

const hostname = 'https://twitter-clone-drf.herokuapp.com/api' // 'http://localhost:8000/api';


export const api = axios.create({
    baseURL: hostname,
    headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": Cookies.get('csrftoken'), 
        
        // 'withCredentials': 'true'      
    },
});