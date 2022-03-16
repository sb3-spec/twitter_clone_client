import axios from "axios";
import Cookies from 'js-cookie'


export const api = axios.create({
    baseURL: 'https://twitter-clone-drf.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": Cookies.get('csrftoken'),
        "Access-Control-Allow-Origin": "*"
        
    }
});