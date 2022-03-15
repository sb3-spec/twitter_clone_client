import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import TweetList from './tweets/components/TweetList';

const app = document.getElementById("root")
if (app) {
    ReactDOM.render(<App />, app);
}

const globalTweetList = document.getElementById("global_tweets")
if (globalTweetList) {
    ReactDOM.render(<TweetList />, globalTweetList);
}







