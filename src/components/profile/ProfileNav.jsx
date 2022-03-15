import React from 'react'
import {NavOption} from './components'
import './styles.css'

export default function ProfileNav({activeView, setActiveView}) {

    const options = [
        'Tweets',
        'Retweets',
        'Likes'
    ]


    return (
        <div className="profile-nav__container">
            <ul className="profile-nav__list">
                {options.map((option, idx) => <NavOption content={option} key={idx} idx={idx} setActiveView={setActiveView} focused={idx === activeView}/>)}
            </ul>
        </div>
    )
}
