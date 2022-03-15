import {useState,  useEffect} from 'react'
import { useNavigate } from 'react-router'
import {apiGetSearchResults} from '../../api/search'
import {UserDisplay, UserPicture} from '../../profiles'

import './styles.css'

export const Search = () => {
    const [tweets, setTweets] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [currSearch, setCurrSearch] = useState('');
    

    const handleChange = (event) => {
        setCurrSearch(event.target.value);
        console.log(event.target.value);
        // TODO apiCall to search for current lookup
        if (event.target.value !== '') {
            console.log('This is the value sent to the back', currSearch)
            apiGetSearchResults(handleChangeCallback, event.target.value)
        }
    }

    const handleChangeCallback = (response, status) => {
        if (status === 200) {
            if (response.tweets) {
                setTweets(response.tweets)
            }
            if (response.profiles) {
                setProfiles(response.profiles)
            }
            
        } else if (status === 404) {
            setProfiles([])
            setTweets([])
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
