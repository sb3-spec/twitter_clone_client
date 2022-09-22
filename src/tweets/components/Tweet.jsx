import { useState, useEffect, useCallback } from 'react';
import { UserLink, UserPicture, UserDisplay } from '../../profiles'
import {api} from '../../api/axios'
import {useNavigate} from 'react-router'
import TweetOptionsBtn from './TweetOptionsBtn'

import '../styles/Tweet.css'

 
function Tweet({ tweet, className, currentUser, focusedTweetId, setFocusedTweetId, idx, setTweets, setTweetsDidSet}) { 
    const [didLike, setDidLike] = useState(false);
    const [didRetweet, setDidRetweet] = useState(false);
    const [likes, setLikes] = useState(tweet.likes);
    const [didLookupTweet, setDidLookupTweet] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const nav = useNavigate();

    // EVENT FUNCTIONS 
    const handleLink = (e) => {
        e.preventDefault()
        e.stopPropagation()
        nav(`/${tweet.id}`)
    }  

    
    function handleTweetAction(action, event) {
        event.stopPropagation()
        event.preventDefault()

        let currentAction = action

        // verifying that action is ok
        if (action === 'like') {
            if (didLike) {
                currentAction = 'unlike'
            }
        } else if (action === 'retweet' & didRetweet) {
            return
        }

        let data = {
            "user": currentUser,
            "tweet_id" : tweet.id, 
            'action': currentAction
        }
        api.post('/tweets/action', data).then((response) => {
            // getTweetData()
        }).catch((err) => {
            console.error(err)
        })
  
    }
    
    // CALLBACKS
    

    // CONTENT


    const Retweet = () => {
        const [loading, setLoading] = useState(true);
        return (loading) ? (
            <div onClick={((e) => handleLink(e))}>
                <div className="retweet-header__container">
                    <div className="retweet-header">retweeted by <UserLink user={tweet.user}>{tweet.user.username}</UserLink></div>
                    
                </div>
                <Tweet loading setLoading={setLoading} 
                tweet={tweet.parent} 
                className={tweet.content ? "retweet" : "retweet no-border"} 
                currentUser={currentUser} setFocusedTweetId={setFocusedTweetId} focusedTweetId={focusedTweetId} key={`${idx}-${tweet.id}`}/>
            </div>
        ) : null
    }

    return true ? (
        <div className={className + " overall-container"} onClick={((e) => handleLink(e))}>
            {!tweet.parent &&
            <div className="profile-container d-flex">
                <div className="mx-1 profile-picture">
                    {tweet.user ? <UserLink><UserPicture user={tweet.user}/></UserLink>: "Loading..."}
                </div>
                <div className="tweet-header">
                    <UserDisplay user={tweet.user} /> 
                </div>
                <TweetOptionsBtn tweet={tweet} currentUser={currentUser} setTweets={setTweets} setIsDeleted={setIsDeleted}/>
            </div>}
            <div className="tweet-container">
                {tweet.content !== "" &&
                <div className="tweet-content-wrapper">
                    <p className="tweet-text">{`${tweet.content}`}</p>
                </div>
                }
                
                {!tweet.parent ?
                    <div className="buttons">
                        <div className="rt-btn__container">
                            <i className={didRetweet ? `fas fa-retweet btn-icon rt-icon text-green` : "fas fa-retweet btn-icon rt-icon"} onClick={((e) => handleTweetAction("retweet", e))}></i>
                        </div>
                        <div className="like-btn__container">
                            <i className={didLike ? "fas fa-heart btn-icon like-icon red-text" : "far fa-heart btn-icon like-icon"} onClick={((e) => handleTweetAction("like", e))}></i>
                            {likes}
                        </div>
                    </div>
                : 
                <div className="retweet-container">
                    <Retweet/>
                </div>}
            </div>
        </div>
    ) : null;
}

export default Tweet;


