import { useEffect, useState, useCallback } from 'react'
import Tweet from './Tweet';
import '../styles/TweetFeed.css';
import {api} from '../../api/axios';



const TweetFeedList = (
  { newTweets, setNewTweets, tweets, 
    setTweets, currUser, callback, nextUrl,
    setFocusedTweetId, focusedTweetId, setTweetsDidSet} ) => { 
  const [loading, setLoading] = useState(true);

  const fetchFeed = useCallback(() => {
    api.get(`/tweets/?${encodeURIComponent(currUser.email)}/feed`).then((response) => {
      if (response.status === 200) {
        console.log(response.data)
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
            nextUrl={nextUrl} setTweets={setTweets} setTweetsDidSet={setTweetsDidSet} />})}
          {/* {nextUrl && <button className='btn btn-outline btn-primary w-100' onClick={handleLoadNext}>Load More</button>} */}
      </div>
  ) : 
    <div className="tweet_feed__container">
      <p>Loading...</p>
    </div>
}

export default TweetFeedList;