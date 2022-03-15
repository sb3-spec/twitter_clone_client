import { lookup } from '../../tweet_lookup/lookup'

export function apiGetProfileData(callback, username, method) {
    let endpoint = `/profiles/${username && username}`

    lookup(method, endpoint, callback)
}

export function apiToggleFollow(callback, username) {
    let endpoint = `/profiles/${username && username}/follow`

    lookup("GET", endpoint, callback)
}

export function apiEditProfile(callback, data) {
    let endpoint = `/profiles/edit`
    lookup("POST", endpoint, callback, data)
}

export function apiGetCurrentProfile(callback) {
    let endpoint = `/profiles/auth`
    lookup("GET", endpoint, callback)
}