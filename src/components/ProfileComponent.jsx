import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import {ProfileBadgeComponent} from '../profiles'
import TweetListFrame from './tweets/TweetListFrame'
import {api} from '../api/axios'
import {ProfileNav} from './profile'

import './styles.css'
import './feed/styles.css'
import {apiGetUserTweets, apiGetUserRetweets, apiGetLikedTweets} from '../api/tweets'


function ProfileComponent(props) {
    const [profile, setProfile] = useState();
    const [activeView, setActiveView] = useState(0);
    const [loading, setLoading] = useState(true);
    const {currUser, className, setCurrUser, homeProfile, isRoot} = props;

    const navigate = useNavigate();

    useEffect(() => {
        if (isRoot) {
            setProfile(currUser);
            setLoading(false);
            return
        }
        const usernameRegex = /(\w+?$)/
        let match = usernameRegex.exec(window.location.pathname)
        let potentialPath = match[0]

        if (potentialPath === 'profile') {
            potentialPath = 'auth'
        }
        

        let apiPath = `profiles/${potentialPath}`

        const fetchProfile = () => {
            api.post(apiPath, {"user": currUser}).then((response) => {
                if (response.data.username === currUser.username) {
                    navigate('/profile')
                }
                setProfile(response.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        let mounted = true;
        if (mounted) {
            fetchProfile();
            setLoading(false);
        }
        return () => {
            mounted = false;
        }   
    }, [currUser, isRoot, loading, navigate, setProfile])
    
    return (
        <div className={`profile twitter_feed`}>
            <div className="profile__header">
                <p className="profile__content">{homeProfile ? currUser.username : profile !== undefined ? profile.username : "anonymous"}</p>
            </div>
            <div className="profile__body">
                <div className="profile">
                    <ProfileBadgeComponent currUser={currUser} 
                    profile={profile} className={className} 
                    setCurrUser={setCurrUser} 
                    setProfile={setProfile}/>
                </div>
                <ProfileNav activeView={activeView} setActiveView={setActiveView}/>
                {activeView === 0 && <TweetListFrame currUser={currUser} profileOwner={profile} apiFunction={apiGetUserTweets}/>}
                {activeView === 1 && <TweetListFrame currUser={currUser} profileOwner={profile} apiFunction={apiGetUserRetweets}/>}
                {activeView === 2 && <TweetListFrame currUser={currUser} profileOwner={profile} apiFunction={apiGetLikedTweets}/>}    
            </div>
        </div>
    );
}

export default ProfileComponent;
