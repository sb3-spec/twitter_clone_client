import {api} from '../../api/axios'

export function ProfilePictureSample({image, alt, index, setCurrUser, closeModal}) {

    const handleImageClick = (event) => {
        event.preventDefault();
        api.post('/profiles/image_update', {
            "user": JSON.parse(localStorage.getItem('loggedInUser')),
            "index": index,
            "type": "picture"
        }).then((response) => {
            setCurrUser(response.data)
            localStorage.setItem('loggedInUser', JSON.stringify(response.data))
            closeModal()
            window.location.reload()
        }).catch((error) => {
            alert(error.message)
        })
    }
    return (
        <div className="profile__sample">
            <img className="pfp_image" src={image} alt={alt} onClick={handleImageClick}/>
        </div>
    )
}

export function BannerSample({banner, index, setCurrUser, closeModal, alt}) {
    const handleImageClick = (event) => {
        event.preventDefault();
        api.post('/profiles/image_update', {
            "user": JSON.parse(localStorage.getItem('loggedInUser')),
            "index": index,
            "type": "banner"
        }).then((response) => {
            setCurrUser(response.data)
            localStorage.setItem('loggedInUser', JSON.stringify(response.data))
            closeModal()
            window.location.reload()
        }).catch((error) => {
            alert(error.message)
        })
    }
    return (
        <div className="banner_sample__outer">
            <img className="pfb_image" src={banner} alt={alt} onClick={handleImageClick} />
        </div>
    )
}