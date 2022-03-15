import BANNERS from '../../media/profile_banners'
import {BannerSample} from './components'

import './styles.css'

function ProfileBannerSelect({handleClick, setCurrUser, closeModal}) {
    return (
        <div className="banner_choice__outer">
            <div className="banner_choice__inner">
                {BANNERS ? BANNERS.map((banner, idx) => <BannerSample banner={banner} key={idx} index={idx} setCurrUser={setCurrUser} closeModal={closeModal}/>) : null}
            </div>
            <button className="btn to_profile_edit" onClick={handleClick}>Back to Profile Edit</button>
        </div>)
}

export default ProfileBannerSelect;