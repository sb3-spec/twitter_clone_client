import {lookup} from '../../tweet_lookup'

export function apiLogin(callback, data) {
    let endpoint = '/auth/login' 

    lookup('POST', endpoint, callback, data)
}

export function apiLogout(callback) {
    let endpoint = '/auth/logout'
    lookup('POST', endpoint, callback);
}