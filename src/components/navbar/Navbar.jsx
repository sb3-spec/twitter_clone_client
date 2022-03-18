import './styles.css'
import React, {useState} from 'react';
import { ProfileResult } from '../explore';
import { useNavigate } from 'react-router'
import {NavbarListItemComponent} from './components'


function Navbar(props) {
    const [activeSection, setActiveSection] = useState('Home');
    const {currentUser} = props
    let navigate = useNavigate();


    const navbarContent = [
        "Home",
        "Profile",
        "Explore",
        "Settings"
    ]

    const getPath = (content) => {
        if (content === 'Home') {
            return '/'
        } else if (content === 'Profile') {
            return 'profile'
        } else if (content === 'Explore') {
            return 'explore'
        } else if (content === 'Settings') {
            return 'settings'
        }
    }

    


    // NAVBAR BELOW
    

    const handleClick = (content) => {
        setActiveSection(content)
        navigate(getPath(content));
             
    }


    return (
        <div className="navbar__container__outer clearfix">
            <div className="navbar__container__inner">
                <ul className='navbar__list'>
                    <li key={'icon'} className="navbar__header">
                        <i onClick={handleClick} className="fab fa-twitter twitter-icon"></i>
                    </li>
                    {navbarContent.map((content, idx) => <li value={content} onClick={() => {
                        handleClick(content);
                    }} key={idx}>
                        <NavbarListItemComponent content={content} 
                            currentUser={currentUser} 
                            setActiveSection={setActiveSection} 
                            active={content === activeSection}
                        />
                    </li>)}
                </ul>

                <div className="profile__snippet">
                    <ProfileResult item={currentUser} className="curved_border "/>
                </div>
            </div>
            
        </div>
  );
}

export default Navbar;



