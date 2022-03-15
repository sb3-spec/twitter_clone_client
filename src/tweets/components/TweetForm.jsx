import { Button } from 'bootstrap-react'
import React, { useRef } from 'react'
import { apiTweetCreate, apiTweetList } from '../tweet_functions'

import '../styles/TweetForm.css'


function TweetForm(props) {
    const textAreaRef = useRef('')

    const handleBackendRefresh = (response, status) => {
        // backened api handler 
        let tempNewTweets = [...props.newTweets]
        if (status === 201) {
            tempNewTweets.unshift(response)
            props.setNewTweets(tempNewTweets)
            apiTweetList(props.username, props.callback)
        } else {
            alert("An error has occurred. Please try again")
        }
    }

    const handleSubmit = (e) => {
        // backend api request
        e.preventDefault()
        const newTweetContent = textAreaRef.current.value
        apiTweetCreate(newTweetContent, handleBackendRefresh, props.username)
        textAreaRef.current.value = ''
    }

    return (
            <div className="tweet-form-container">
                <div className="form_container">
                    <form onSubmit={((e) => handleSubmit(e))}>
                        <textarea ref={textAreaRef} required={true} className="form-control">
                        </textarea>
                        <Button variant="primary">Tweet</Button>
                    </form>
                </div>
            </div>
    )
}

export default TweetForm
