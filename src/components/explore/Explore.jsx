import React from 'react';
import {Search} from './'
import {TweetListFrame} from '../tweets'
import {apiTweetList} from '../../api/tweets'

import './styles.css'
function Explore({currUser}) {

  return (
    <div className="explore__outer">
        <div className="explore__inner">
          <Search currUser={currUser}/>
        </div>
        <TweetListFrame profileOwner={currUser} currUser={currUser} apiFunction={apiTweetList}/>
    </div>
  );
}

export default Explore;
