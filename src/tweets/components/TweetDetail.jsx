import React, { useState, useEffect } from 'react'
import { apiTweetDetail } from '../tweet_functions'
import {apiUserLookup} from '../tweet_functions' 
import Tweet from './Tweet'
import '../styles/TweetDetail.css'

function TweetDetail (props) {
    const { tweetId } = props
    const [didLookup, setDidLookup] = useState(false);
    const [currUser, setCurrUser] = useState();
    const [tweet, setTweet] = useState(null);

    const handleTweetLookup = (response, status) => {

        if (status === 200) {
            setTweet(response);
        }
    }

    const handleCurrUserLookup = (response, status) => {
        if (status === 200) {
            setCurrUser(response.username);
        }
    }



    useEffect(() => {
        if (didLookup === false) {
            apiTweetDetail(tweetId, handleTweetLookup);
            apiUserLookup(handleCurrUserLookup);
            setDidLookup(true);  
        }
    }, [setDidLookup, tweetId, didLookup])

    return tweet !== null && (
        <div className="detail-container">
            <div className="d-flex">    
                <div className="col-11">
                    <Tweet tweet={tweet} currentUser={currUser}/>
                </div> 
            </div>
        </div>
    )
      
}

export default TweetDetail;
