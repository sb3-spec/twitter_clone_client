import React, {useState, useEffect} from 'react';
import {apiGetUserTweets} from '../tweet_functions'
import Tweet from './Tweet'
import '../styles/TweetFeed.css'


function UserTweetList(props) {
    const [tweets, setTweets] = useState([]);
    const [tweetsExist, setTweetsExist] = useState(false);
    const [loading, setLoading] = useState(true);
    const [nextUrl, setNextUrl] = useState();
    const {user, handleLoadNextResponse, callback} = props;


    const handleGetUserTweets = (response, status) => {
        if (status === 200) {
            setTweets(response.results);
            setTweetsExist(true);
            setNextUrl(response.next)
        } else if (status === 202) {

        }
    }

    const handleLoadNext = (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (nextUrl !== null) {
            apiGetUserTweets(handleLoadNextResponse, user.username, nextUrl);
        }
    }

    useEffect(() => {
        let mounted = true

        if (mounted === true && user) {
            apiGetUserTweets(handleGetUserTweets, user.username);
            setLoading(false);
        }

        return () => {
            mounted = false
        }
    }, [setLoading, handleLoadNextResponse, user]);


  return (!loading && tweetsExist) ? (
    <div className="tweet_feed__container">
        {tweets.length === 0 ? 
        <div>
            <p>user has no tweets</p>
        </div> : 
        <div>
            {tweets.map((tweet, idx) => {return <Tweet tweet={tweet} idx={idx} key={`${idx}-{tweet.id}`} callback={callback} currentUser={user}/>})}
            {nextUrl !== null && <button className='btn btn-outline btn-primary' onClick={handleLoadNext}>Load More</button>}
        </div>}
      </div>
  ) : (
    null
  );
}

export default UserTweetList;
