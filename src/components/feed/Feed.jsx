import React from 'react';
import TweetFeedList from '../../tweets/components/TweetFeedList';
import TweetForm from '../../components/tweet-form/TweetForm';
import './styles.css';

function Feed(props) {
    const {currUser, newTweets, setNewTweets,
        tweets, setTweets, tweetsDidSet, 
        callback, setTweetsDidSet, nextUrl, 
        handleLoadNextResponse, setFocusedTweetId, focusedTweetId} = props  
    
    return (
        <div className="twitter_feed">
            <div className="home__header">
                <p className="header__content">Home</p>
            </div>
            <div className="twitter-feed__container">
                <TweetForm
                    currUser={currUser}
                    newTweets={newTweets}
                    setNewTweets={setNewTweets}
                    tweets={tweets}
                    setTweets={setTweets}
                    tweetsDidSet={tweetsDidSet}
                    callback={callback}
                />
                <TweetFeedList
                    focusedTweetId={focusedTweetId}
                    setFocusedTweetId={setFocusedTweetId}
                    newTweets={newTweets}
                    setNewTweets={setNewTweets}
                    tweets={tweets}
                    setTweets={setTweets}
                    currUser={currUser}
                    tweetsDidSet={tweetsDidSet}
                    setTweetsDidSet={setTweetsDidSet}
                    callback={callback}
                    nextUrl={nextUrl}
                    handleLoadNextResponse={handleLoadNextResponse}
                /> 
            </div>
        </div>
    )
}

export default Feed;
