import axios from "axios";
import Cookies from 'js-cookie'
import env from "react-dotenv"

console.log(env.REACT_APP_ENVIRONMENT)
const hostname = env.REACT_APP_ENVIRONMENT === "production" ? env.REACT_APP_API_URI : 'http://localhost:8000/api';


export const api = axios.create({
    baseURL: hostname,
    headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": Cookies.get('csrftoken'), 
        
        // 'withCredentials': 'true'      
    },
});