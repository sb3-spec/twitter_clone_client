import { useEffect, useState, useCallback } from 'react'
import Tweet from './Tweet'
import { apiTweetFeed } from '../tweet_functions'
import '../styles/TweetFeed.css'
import {api} from '../../api/axios'



const TweetFeedList = (
  { newTweets, setNewTweets, tweets, 
    setTweets, currUser, tweetsDidSet, 
    callback, nextUrl, handleLoadNextResponse, 
    setFocusedTweetId, focusedTweetId} ) => { 
  const [loading, setLoading] = useState(true);

  const handleLoadNext = (e) => {
    e.preventDefault();
    if (nextUrl !== null) {
      apiTweetFeed(currUser, handleLoadNextResponse, nextUrl);
    }
  }

  const fetchFeed = useCallback(() => {
    api.post('/tweets/feed', {"user" : currUser}).then((response) => {
      if (response.status === 200) {
        setTweets(response.data);
      }
      setLoading(false);
    }).catch((error) => {
      console.error(error)
    })
  }, [currUser, setTweets]);

  useEffect(() => {
    if (newTweets.length > 0) {
      setTweets([...newTweets, ...tweets]);
      setNewTweets([]);
    }
  }, [newTweets, setNewTweets, setTweets, tweets]);
  
  useEffect(() => {
    let mounted = true;
    if (mounted && loading) {
      fetchFeed()
    }
    return () => {
      mounted = false
    }
    
  }, [fetchFeed, loading]);

  return (!loading && tweets?.length > 0) ? (
      <div className="tweet_feed__container">
          {tweets.map((tweet, idx) => {return <Tweet focusedTweetId={focusedTweetId} setFocusedTweetId={setFocusedTweetId} tweet={tweet} idx={idx} key={`${idx}-${tweet.id}`}
            callback={callback} currentUser={currUser} 
            nextUrl={nextUrl} />})}
          {nextUrl && <button className='btn btn-outline btn-primary w-100' onClick={handleLoadNext}>Load More</button>}
      </div>
  ) : 
    <div className="tweet_feed__container">
      <p>Loading...</p>
    </div>
}

export default TweetFeedList;