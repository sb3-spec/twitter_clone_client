import React from 'react'
import IMAGES from '../../media/index.js'
import {ProfilePictureSample} from './components'

import './styles.css'

function ProfilePictureChoice({handleClick, setCurrUser, closeModal}) {
  return (
    <div className="profile_choice__outer">
        <div className="profile_choice__inner">
            {console.log(IMAGES)}
            {IMAGES.map((image, index) => 
                <ProfilePictureSample setCurrUser={setCurrUser} closeModal={closeModal} image={image} alt={'Profile Picture'} key={index} index={index} />
            )}
        </div>
        <button className="btn" onClick={handleClick}>Back to Profile Edit</button>
    </div>
  )
}

export default ProfilePictureChoice