import React, { useState, useEffect, createRef } from 'react'
import '../styles/TweetOptionsBtn.css'
import {api} from '../../api/axios'

function TweetOptionsBtn({ tweet, currentUser, setIsDeleted, setTweets }) {
    const [clicked, setClicked] = useState(false);
    const [options, setOptions] = useState([]);

    const modalWindow = createRef();

    

    window.addEventListener('mousedown', (event) => {
        if (
            modalWindow.current &&
            !modalWindow.current.contains(event.target)
        ) {
            event.preventDefault();
            event.stopPropagation();
            setClicked(false);
        }
    });

    const toggleOptionsButton = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setClicked(true);
    };


    function TweetOption({ content }) {

        const deleteTweet = () => {
            api.post(`/tweets/${tweet.id}/delete/`, {'user': currentUser}).then(handleTweetDelete()).catch(() => {alert('Error, could not complete action')})
        }


        const handleOptionChoice = (event) => {
            event.preventDefault();
            event.stopPropagation();
            setClicked(false);
    
            if (content === 'Delete Tweet') {
                // apiTweetDelete(handleTweetDelete, tweet.id, currentUser)
                deleteTweet()
            } else if (content === 'Pin to Profile') {
                
            } else if (content === 'report') {

            } else if (content === 'follow') {

            } else if (content === 'block') {

            }
        }

        const handleTweetDelete = () => {
            setIsDeleted(true)
            var brokenUrl = window.location.pathname.split('/');
            var username = brokenUrl.pop();

            console.log(username)

            if (username === 'profile') {
                // apiGetUserTweets()
                api.post(`/tweets/${username}/tweets/`, {'user': currentUser}).then((response) => {
                    setTweets(response.data)
                }).catch(() => {alert('Error, could not update user tweets')})
            } else {
                // apiTweetFeed(currentUser, callback, nextUrl)
                api.post(`/tweets/feed`, {'user': currentUser}).then((response) => {
                    setTweets(response.data)
                }).catch(() => {alert('Error, could not update feed')})
            }
        }

        return (
            <div className="option" onClick={handleOptionChoice}>
                <p className="option__content">{content}</p>
            </div>
        )
    }

    useEffect(() => {
        if (tweet.user === undefined || currentUser === undefined){return}
        if (tweet.user.username !== currentUser.username) {
            setOptions(['Report Tweet', `Block @${tweet.user.username}`, `Follow @${tweet.user.username}`])
        } else {
            setOptions(['Delete Tweet', 'Pin to profile'])
        }
    }, [setOptions, currentUser, tweet.user]);


    return !clicked ? (
        <div onClick={toggleOptionsButton} className="options-btn__untoggled">
            <i className="fas fa-ellipsis-h options-icon"></i>
        </div>
    ) : (
        <div className="modal__background">
            <div className="options-btn__toggled" ref={modalWindow}>
                {options.map((option, idx) => <TweetOption content={option} currentUser={currentUser} key={idx}/>)}
            </div>
        </div>
    );
}

export default TweetOptionsBtn;
