import React, {useRef, useState} from 'react';
import {api} from '../../api/axios'
import ProfilePictureChoice from './ProfilePictureChoice'
import ProfileBannerSelect from './ProfileBannerSelect'

import './styles.css';

function ProfileEdit(props) {
    const {user, closeModal, setCurrUser} = props
    const usernameRef = useRef(user.username);
    const bioRef = useRef(user.bio);
    const locationRef = useRef(user.location);
    const emailRef = useRef(user.email);
    const firstNameRef = useRef(user.first_name);
    const lastNameRef = useRef(user.last_name);
    const [error, setError] = useState('');
    const [editImages, setEditImages] = useState(false);
    const [editingBanner, setEditingBanner] = useState(false);
    

    const saveProfile = (event) => {
        event.preventDefault();



        const editData = {
            "username": usernameRef.current.value,
            'bio': bioRef.current.value,
            "location": locationRef.current.value,
            "email": emailRef.current.value,
            "firstName": firstNameRef.current.value,
            "lastName": lastNameRef.current.value,
        }

        const data = {
            "user": user,
            "editData": editData
        }

        api.post('/profiles/edit', data).then((response) => {
            setCurrUser(response.data)
            localStorage.setItem('loggedInUser', JSON.stringify(response.data))
            closeModal()
        }).catch((error) => {
            
            closeModal()
            alert('Error updating profile: ' + error.message)
        })
    }

    function handleSelectProfilePics(event) {
        event.preventDefault()
        setEditImages((prevState) => !prevState)
        setEditingBanner(false)
    }

    function handleSelectBanners(event) {
        event.preventDefault()
        setEditingBanner((prevState) => !prevState)
        setEditImages(false)
    }

    const FormSection = () => {
        return (
        <div>
            <div className={`profile-forms`}>
                {error && <div className="error">{error}</div>}
                <form>
                    <div className="form-container">
                        <label>Username</label>
                        <textarea className="edit username" defaultValue={usernameRef.current} ref={usernameRef}></textarea>
                    </div>
                    <div className="form-container">
                        <label>Bio</label>
                        <textarea className="edit bio" defaultValue={bioRef.current} ref={bioRef}></textarea>
                    </div>
                    <div className="form-container small-form">
                        <label>Location</label>
                        <textarea className="edit location" defaultValue={locationRef.current} ref={locationRef}></textarea>
                    </div>
                    <div className="form-container small-form">
                        <label>First Name</label>
                        <textarea className="edit firstname" defaultValue={firstNameRef.current} ref={firstNameRef}></textarea>
                    </div>
                    <div className="form-container small-form">
                        <label>Last Name</label>
                        <textarea className="edit lastname" defaultValue={lastNameRef.current} ref={lastNameRef}></textarea>
                    </div>
                    <div className="form-container small-form">
                        <label>Email</label>
                        <textarea className="edit location" defaultValue={emailRef.current} ref={emailRef}></textarea>
                    </div>
                </form>
            </div>
            <div className="image_change__btns">
                <button className="btn pfp" onClick={handleSelectProfilePics}>Edit Profile Picture</button>
                <button className="btn pfb" onClick={handleSelectBanners}>Edit Profile Banner</button>
            </div>
        </div>)
    }


    return (
        <div className="modal-container">
            <div className="overlay"></div>
            <div className="edit-profile__container">
                <div className="edit__banner">
                    <div className="close-modal__container">
                        <span className="close-modal__bg" onClick={closeModal}><i className="fa-solid fa-xmark close-modal"></i></span>
                    </div>
                    <div className="banner__text__container">
                        <p className="banner__text">Edit Profile</p>
                    </div>
                    <button className="save-btn" onClick={saveProfile}>Save</button>
                </div>
                {(!editImages && !editingBanner) && <FormSection />}
                {editImages && <ProfilePictureChoice closeModal={closeModal} handleClick={handleSelectProfilePics} setCurrUser={setCurrUser}/>}
                {editingBanner && <ProfileBannerSelect handleClick={handleSelectBanners} setCurrUser={setCurrUser} closeModal={closeModal}/>}
            </div>
        </div>
    );
}

export default ProfileEdit;
