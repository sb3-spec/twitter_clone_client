import {useState,  useEffect} from 'react'
import { useNavigate } from 'react-router'
import {api} from '../../api/axios'
import {UserDisplay, UserPicture} from '../../profiles'

import './styles.css'

export const Search = ({currUser}) => {
    const [tweets, setTweets] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [currSearch, setCurrSearch] = useState('');
    

    const handleChange = (event) => {
        if (event.target.value === '' || currSearch === '') {return}
        setCurrSearch(event.target.value);
        if (event.target.value !== '') {
            api.post('/search/', {'search_term' : currSearch, 'user': currUser}).then((response) => {
                handleChangeCallback(response)
            }).catch((error) => {
                alert('Error in search')
                setProfiles([])
                setTweets([])
            })
        }
        
    }

    const handleChangeCallback = (response) => {
        if (response.tweets) {
            setTweets(response.tweets)
        }
        if (response.profiles) {
            setProfiles(response.profiles)
        } 
    }

    useEffect(() => {
        if (currSearch === '') {
            setTweets([])
            setProfiles([])
        }
    }, [currSearch]);


    return (
        <div>
            <div className="search__outer">
                <div className="search__inner">
                <div className="search-icon__container"><i className="fa-solid fa-magnifying-glass"></i></div>
                    <div>
                        <input
                            type="text"
                            onChange={handleChange}
                            className="search__form"
                            placeholder="Search Twitter"
                        />
                    </div>
                </div>
            
            </div>
            <br/>
            <br/>
            <div className="dropdown__shell">
                <SearchDropDown tweets={tweets} profiles={profiles}/>
            </div>
        </div>
    )
}



export const SearchDropDown = ({tweets, profiles}) => {
    return (
        <div className="search-dropdown__outer">
            {/* <div className="list__shell">{tweets && tweets.map((tweet) => <DropdownItem item={tweet} tweet/>)}</div> */}
            <div className="list__shell">{profiles && profiles.map((profile) => <DropdownItem item={profile}/>)}</div>
        </div>
    );
}

export const DropdownItem = ({item, tweet}) => {
    return (
        <div className="result__outer">
            {tweet ? <TweetResult item={item}/> : <ProfileResult item={item}/>}
        </div>
    )
}

const TweetResult = ({item}) => {
    return (
        <div>
            <UserDisplay user={item}/> 
        </div>
    )
}



export const ProfileResult = ({item, className}) => {
    const navigate = useNavigate();

    function handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        navigate(`/profile/${item && item.username}`)  
    }

    return (
        <div onClick={handleClick} className={`result__inner ${className}`}>
            <UserPicture user={item}/>
            <div>
                <UserDisplay user={item}/>
                {!item.is_following ? <div>{item.bio}</div> : 'You are already following this user'}
            </div>
        </div>
    )
}
