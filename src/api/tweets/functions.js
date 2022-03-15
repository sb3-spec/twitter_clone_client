import { lookup } from '../../tweet_lookup/lookup'

export function apiTweetCreate(newTweet, callBack, user) {
    lookup("POST", "/tweets/create/", callBack, {content: newTweet, username: user})
}
  
export function apiTweetList(callback, username) {
    let endpoint = '/tweets/'

    if (username) {
        endpoint += `?username=${username}`
    }

    lookup("GET", endpoint, callback)
}

export function apiTweetFeed(username, callback, nextUrl) {
    let endpoint = `/tweets/feed/`

    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    lookup("GET", endpoint, callback, {"username": username})  
}

export function apiTweetDetail(tweetId, callback) {
    let endpoint = '/tweets/'

    if (tweetId) {
        endpoint += `${tweetId}`
    }
    lookup("GET", endpoint, callback, {tweet_id: tweetId})
}

export function apiTweetAction(tweetId, action, callback, user) {
    lookup("POST", "/tweets/action/", callback, {id: tweetId, action: action, username: user})
}

export function apiUserLookup(callback) {
    let endpoint = '/users/auth/'

   
    lookup("GET", endpoint, callback)
}

export function apiCheckCurrentUserHasLiked(callback, tweetId) {
    let endpoint = '/tweets/like_check/'
    if (tweetId) {
        endpoint += `${tweetId}`
    }

    lookup("GET", endpoint, callback)
}

export function apiGetTweetData(callback, tweetId) {
    let endpoint = '/tweets/data/'
    
    if (tweetId) {
        endpoint += `${tweetId}`
    }

    lookup("GET", endpoint, callback)
}

export function apiTweetDelete(callback, tweetId, username) {
    let endpoint = '/tweets/'
    
    if (tweetId) {
        endpoint += `${tweetId}/delete/`
    }

    let data = {
        "username": username,
    }

    lookup("POST", endpoint, callback, data)
}

export function apiGetUserTweets(callback, username, nextUrl) {
    let endpoint = '/tweets/'

    if (username !== null && username !== undefined) {
        endpoint += `${username}/tweets/`
    }

    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }

    lookup("GET", endpoint, callback)

}

export function apiGetUserRetweets(callback, username) {
    let endpoint = `/tweets/retweets/${username}`
    lookup("GET", endpoint, callback)
}

export function apiGetLikedTweets(callback, username) {
    let endpoint = `/tweets/likes/${username}`
    lookup("GET", endpoint, callback)
}