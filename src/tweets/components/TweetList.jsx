import { useEffect, useState } from 'react'
import Tweet from './Tweet'
import { apiTweetList } from '../tweet_functions'
import '../styles/TweetFeed.css'


const TweetList = ({ newTweets, setNewTweets, tweets, setTweets, username, tweetsDidSet, callback, nextUrl, handleLoadNextResponse }) => {
  const [loading, setLoading] =  useState(true);
  
  const handleLoadNext = (e) => {
    e.preventDefault();
    if (nextUrl !== null) {
      apiTweetList(username, handleLoadNextResponse, nextUrl)
    }
  }

  useEffect(() => {
    if (newTweets.length > 0) {
      setTweets([...newTweets, ...tweets])
      setNewTweets([])
    }
  }, [newTweets, tweets, setTweets, setNewTweets]);
  
  useEffect(() => {
    if (tweetsDidSet === false) {
      apiTweetList(username, callback)
      setLoading(false);
    }
  }, [tweetsDidSet, username, callback]);

  return (!loading && tweets) ? (
      <div className="tweet_feed__container">
          {tweets.map((tweet, idx) => {return <Tweet tweet={tweet} idx={idx} key={`${idx}-{tweet.id}`} callback={callback} currentUser={username}/>})}
          {nextUrl && <button className='btn btn-outline btn-primary' onClick={handleLoadNext}>Load More</button>}
      </div>
  ) :
    <div className="tweet_feed__container">
      <p>Loading...</p>;
    </div>
}

export default TweetList