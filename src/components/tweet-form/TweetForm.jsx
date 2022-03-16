import React, {useRef} from 'react';
import {api} from '../../api/axios'
import {UserPicture} from '../../profiles';
import './styles.css'

function TweetForm(props) {
    const {currUser, setTweets} = props
    const textAreaRef = useRef('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTweetContent = textAreaRef.current.value

        
        if (newTweetContent !== '') {
            api.post('/tweets/create/', {'user': currUser, 'content': newTweetContent}).then((response) => {
                let tempNewTweets = [...props.newTweets]
                tempNewTweets.unshift(response)
                props.setNewTweets(tempNewTweets)
                api.post('/tweets/feed', {"user" : currUser}).then((response) => {
                    if (response.status === 200) {
                      setTweets(response.data);
                    }
                  }).catch((error) => {
                    console.error(error)
                  })
            }).catch((error) => {
                alert('Error occurred while making the tweet')
            })
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
