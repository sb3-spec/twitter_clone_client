import React from 'react'
import {useNavigate} from 'react-router'
import IMAGES from '../media'

import './styles.css'


export const UserPicture = (props) => {
    const {user, hideLink, isProfile} = props
    
    
    return !hideLink ? ( 
        <div className="profile__picture__shell">
            <UserLink user={user} hideLink={hideLink}>
                <div className={!isProfile ? "profile__picture__shell tweet__avatar" : "profile__picture__shell profile_view large"}>
                    <img className={!isProfile ? "profile_img" : "profile_img large"} src={IMAGES[user.profile_picture]} alt="white egg blue background"/>
                </div>
            </UserLink>
        </div>
    ) : (
        <div className="profile__picture__shell"> 
            <img className={`profile_img ${isProfile && "large"}`} src={IMAGES[user.profile_picture]} alt="white egg blue background"/>
        </div>
    )
}


export const UserLink = ({ user, children }) => {
    const navigate = useNavigate();

    const handleUserLink = (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/profile/${user && user.username}`)
    }

    return (
    <>
        <span className="pointer" onClick={handleUserLink}>
            {children}
        </span>
    </>
    )
}

export function UserDisplay({user, includeFullName, hideLink}) {
    const nameDisplay = includeFullName ? `${user.first_name} ${user.last_name}` : `${user.username}`

    return (
        <div className="user-display__container">
            {nameDisplay}{' '}
            {hideLink ? `@${user.username}` : <UserLink user={user}>{`@${user.username}`}</UserLink>}
        </div>
    )
}

export function UserImages({user, banner, hideLink, isEditing}) {
    return (
        <div className="images__container">
            <div className="profile__banner_picture"><img className="banner-img" src={banner} alt="mountain in front of sunset"/></div>
            <div className="profile__picture">
                <UserPicture user={user} isProfile hideLink={hideLink}/>
            </div>
        </div>
        
    )
}



