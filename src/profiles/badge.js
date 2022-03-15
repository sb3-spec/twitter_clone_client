import React, {useState} from 'react'
import {UserImages} from './components'
import {api} from '../api/axios'
import numeral from 'numeral'

import BANNERS from '../media/profile_banners'
import './styles.css'
import ProfileEdit from '../components/profile-edit/ProfileEdit'

export const ProfileBadgeComponent = (props) => {
    const {currUser, className, setCurrUser, profile, setProfile} = props

    return <ProfileBadge profile={profile} currUser={currUser} setProfile={setProfile} className={className} setCurrUser={setCurrUser}/> 
}


function ProfileBadge(props) {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const {profile, setProfile, className, setCurrUser, currUser, homeProfile} = props

    const handleFollowToggle = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!profile) {return}

        console.log(profile)
        const data = {
            "user": currUser,
            "targetUsername": profile?.username || 'anon'
        }
        api.post('/profiles/follow', data).then(
            (response) => {
                setProfile(response.data)
            }
        ).catch(
            (error) => {
                alert(error.message)
            }
        )
    }

    const handleToggleEdit = (event) => {
        setIsEditingProfile((prevState) => !prevState);
    }


    const handleProfileEditCallback = (response, status) => {
        if (status === 200) {
            setCurrUser(response);
        }
        window.location.href = `/profile/${response.username}`
    }

    return profile !== undefined ? (
        <div className={`profile-container ${className}`}>
            <UserImages user={profile} banner={BANNERS[profile.profile_banner]} homeProfile={homeProfile} hideLink isProfile/>          
            <div className="profile__info">
                <h3>{profile.username}</h3>
                <p>{`@${profile.username}`}</p>

                <div className='bio'>{profile.bio}</div>
                <div className='location'><i className="fa-solid fa-location-dot"></i>{" " + profile.location}</div>

                <div className="follower-following-display">
                   <div className="following-count">
                       <p className="number">{numeral(profile.following_count || 0).format("0a")}</p><p className="text">{" "}Following{" "}</p>
                   </div>
                    <div className="follower-count">
                        <p className="number">{numeral(profile.follower_count || 0).format("0a")}</p><p className="text">{" "}{profile.follower_count === 1 ? 'Follower' : 'Followers'}</p>
                    </div>
                </div>
                
            </div>
            <div className="profile__buttons">
                {profile.username === currUser.username ? 
                <button onClick={handleToggleEdit} className="profile__action-button">{'Edit Profile'}</button> 
                : <button onClick={handleFollowToggle} className="profile__action-button">{profile.is_following ? 'Unfollow' : 'Follow'}</button>}                   
            </div>
            {isEditingProfile && <ProfileEdit user={currUser} closeModal={handleToggleEdit} 
            setCurrUser={setCurrUser} callback={handleProfileEditCallback}/>}
        </div>
    ) : <div>
            {console.log(profile)}
            <p>Error</p>
        </div>
}



