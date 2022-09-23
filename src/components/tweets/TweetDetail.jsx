import {useEffect, useState, useCallback} from 'react';
import Tweet from '../../tweets/components/Tweet'
import {api} from '../../api/axios'
import './styles.css'

function TweetDetail({currUser}) {
    const [didLookupTweet, setDidLookupTweet] = useState(false);
    const [tweet, setTweet] = useState({});

    const fetchTweetData = useCallback(async () => {
        var tweetIdRegex = /\d+$/
        let match = window.location.pathname.match(tweetIdRegex)
        if (match === null  || match === undefined) {
            return
        }
        let tweetId = match[0]
        await api.get(`/tweets/${tweetId}`).then((response) => {
            setTweet(response.data)
            console.log(response.data);
        }).catch((error) => {console.log(error)})
    }, []);

    useEffect(() =>{
        let mounted = true

        const asyncWrapper = async () => {
            await fetchTweetData()
            setDidLookupTweet(true)
        }   
        if (mounted && !didLookupTweet) {
            asyncWrapper();
        }
        return () => {
            mounted = false
        }
        
    }, [didLookupTweet, fetchTweetData]);
    


    return didLookupTweet ? (
        <div className="column-container">
            <div className="tweet-detail__header">
                <p className="header__content">Tweet</p>
            </div>
            <div className="tweet-detail__container">
                {console.log(tweet)}
                <Tweet tweet={tweet} currentUser={currUser}/>
            </div>
        </div>
    ) : <p>Loading...</p>;
  
  
}

export default TweetDetail;
