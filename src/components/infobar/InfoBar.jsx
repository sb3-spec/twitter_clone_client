import {useEffect, useState, useCallback} from 'react'
import {Search} from '../explore'
import {ListWidget} from './'
import axios from 'axios';
import Cookies from 'js-cookie'
// 'http://localhost:8000/api'

import './styles.css'

const api = axios.create({
  baseURL: 'https://twitter-clone-drf.herokuapp.com/api',
  headers: {
      'Content-Type': 'application/json',
      "X-CSRFToken": Cookies.get('csrftoken'),
  }
})

function InfoBar({currUser}) {
  const [tweets, setTweets] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [tweetsLoading, setTweetsLoading] = useState(true);

  const fetchTrending = useCallback(() => {
      api.post('/tweets/trending', {"user": currUser}).then((response) => {
          console.log(response, response.status)
          let data = [].slice.call(response.data).slice(0, 3)
          setTweets(data)
      }).catch((error) => {
          console.error(error)
      })
  }, [currUser]);

  useEffect(() =>{
    // FETCHING TRENDING TWEETS
    let mounted = true;
    if (mounted && tweetsLoading) {
      fetchTrending();
      setTweetsLoading(false)
    }
    return () => {mounted = false}
  }, [fetchTrending, tweetsLoading]);

  useEffect(() =>{
    // FETCHING TRENDING TWEETS
    let mounted = true;
    const fetchProfiles = async () => {
        if (!mounted || !tweetsLoading) {return}
        api.post('/profiles/suggestions', {"user" : currUser}).then((response) => {
            console.log(response, response.status)
            let data = [].slice.call(response.data).slice(0, 3)
            setProfiles(data)
        }).catch((error) => {
            console.error(error)
        })
    }
    fetchProfiles();
    setTweetsLoading(false)
    return () => {
        mounted = false
    }
  }, [currUser, tweetsLoading]);


  return (
    <div className="infobar__outer">
        <Search />
        <ListWidget items={tweets} currUser={currUser} header="What's trending"/>
        <br />
        <ListWidget items={profiles} currUser={currUser} header="Who to follow" profile/>
    </div>
  )
}

export default InfoBar