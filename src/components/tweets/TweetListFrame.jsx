import React, {useState, useEffect} from 'react'
import Tweet from '../../tweets/components/Tweet';

import './styles.css'

export default function TweetListFrame({activeView, currUser, profileOwner, apiFunction}) {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    // CALLBACKS
    const fetchTweetsCallback = (response, status) => {
        if (status === 200) {
            setTweets(response);
            setLoading(false);
        } else {
            console.log(response)
        }
    }




    // USEEFFECTS
    useEffect(() => {
        let mounted = true;
        const fetchTweets = async () => {
            if (!mounted | !loading | !profileOwner) {return}
            apiFunction(fetchTweetsCallback, profileOwner.username) 
        }
        fetchTweets()
        return () => {
            mounted = false;
        }
    }, [activeView, apiFunction, loading, profileOwner])

    
    return (
        <div className={`tweet-frame__container`}>
            <div className="tweets-list">
                <ol>
                    {tweets && tweets.map((tweet, idx) => <Tweet tweet={tweet} key={idx} currentUser={currUser} setTweets={setTweets}/>)}
                </ol>
            </div>
        </div>
    )
}
