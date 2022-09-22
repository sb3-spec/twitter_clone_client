import {useEffect, useState, useCallback} from 'react';
import {Search} from '../explore';
import {ListWidget} from './';

import {api} from '../../api/axios';
// 'http://localhost:8000/api'

import './styles.css'

function InfoBar({currUser}) {
  const [tweets, setTweets] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [tweetsLoading, setTweetsLoading] = useState(true);

  const fetchTrending = useCallback(() => {
      api.get(`/tweets/?${encodeURIComponent(currUser.email)}/trending`).then((response) => {
          let data = [].slice.call(response.data).slice(0, 3);
          setTweets(data);
      }).catch((error) => {
          console.error(error);
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
    // FETCHING SUGGESTED PROFILES
    let mounted = true;
    const fetchProfiles = async () => {
        if (!mounted || !tweetsLoading) {return}
        api.get(`/profiles/?${encodeURIComponent(currUser.email)}/suggestions`).then((response) => {
            let data = [].slice.call(response.data).slice(0, 3);
            setProfiles(data);
        }).catch((error) => {
            console.error(error);
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
        <Search currUser={currUser} />
        <div className="infobar__inner">
          <ListWidget items={tweets} currUser={currUser} header="What's trending"/>
          <br />
          <ListWidget items={profiles} currUser={currUser} header="Who to follow" profile/>
        </div>
    </div>
  )
}

export default InfoBar