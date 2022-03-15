import React, {useRef} from 'react';
import {apiTweetFeed, apiTweetCreate} from '../../tweets/tweet_functions';
import {UserPicture} from '../../profiles';
import './styles.css'

function TweetForm(props) {
    const {currUser} = props
    const username = currUser  && currUser.username
    const textAreaRef = useRef('')


    const handleBackendRefresh = (response, status) => {
        // backened api handler 
        let tempNewTweets = [...props.newTweets]
        if (status === 201) {
            tempNewTweets.unshift(response)
            props.setNewTweets(tempNewTweets)
            apiTweetFeed(props.username, props.callback)
        } else {
            alert("An error has occurred. Please try again")
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const newTweetContent = textAreaRef.current.value
        if (newTweetContent !== '') {
            apiTweetCreate(newTweetContent, handleBackendRefresh, username);
        }
        textAreaRef.current.value = ''
    }


    return (
            <div className="tweet-form__container-outer">
                <div className="tweet-form__container-inner">
                    <div className="profile__container">
                        <UserPicture user={currUser ? currUser : {"username":"anon"} }/>
                    </div>
                    <form className="tweet-form">
                        <label className=""></label>
                        <textarea placeholder="What's happening?" ref={textAreaRef} required={true} className="tweet-form__textarea">
                        </textarea>
                    </form>
                </div>
                <div className="tweet-form__buttons">
                    <button className="tweet-form__submit" onClick={handleSubmit}>Tweet</button>
                </div>
            </div>
    )
}

export default TweetForm;
