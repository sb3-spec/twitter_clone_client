import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import MessageHub from '../components/messages/MessageHub';
import Explore from '../components/explore/Explore'
import {InfoBar} from '../components/infobar'


// import TweetList from "../tweets/components/TweetList"
import '../styles/Home.css'
import '../profiles/styles.css'
import Feed from '../components/feed/Feed'
import ProfileComponent from '../components/ProfileComponent'
import Navbar from "../components/navbar/Navbar"
import {TweetDetail} from '../components/tweets'
import Settings from '../components/settings/Settings'



function Home({currUser, setCurrUser}) {
    const [focusedTweetId, setFocusedTweetId] = useState(0)
    const [newTweets, setNewTweets] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [tweetsDidSet, setTweetsDidSet] = useState(false);
    const [nextUrl, setNextUrl] = useState();
    const [currentSection, setCurrentSection] = useState('Home');
    const [loading, setLoading] = useState(true);

    function apiTweetListCallback (response, status) {
      console.log(response)
      if (status === 200) {
        setTweets(response);
        setTweetsDidSet(true);
        setLoading(false);
      } else {
        alert("There was an error")
      }
    };
 

    const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
            const newTweets = [...tweets].concat(response.results)
            setTweets(newTweets)
          } else {
            alert("There was an error")
          }
    };

    useEffect(() => {
      if (currUser === undefined) {
        let curr = JSON.parse(localStorage.getItem('loggedInUser'))
        curr && setCurrUser(curr)
      }
    }, [currUser, setCurrUser]);

    

    return ( 
        <div className="home-container clearfix">
          <Navbar setCurrentSection={setCurrentSection} currentSection={currentSection} currentUser={currUser}/>
          <Routes>
              <Route exact path='/' element={<Feed focusedTweetId={focusedTweetId} setFocusedTweetId={setFocusedTweetId} 
              loading={loading} currUser={currUser} newTweets={newTweets} setNewTweets={setNewTweets}
              tweets={tweets} setTweets={setTweets}tweetsDidSet={tweetsDidSet} callback={apiTweetListCallback}
              setTweetsDidSet={setTweetsDidSet} nextUrl={nextUrl} handleLoadNextResponse={handleLoadNextResponse} />}/>
              
              <Route exact path='profile' element={<ProfileComponent 
                    currUser={currUser} callback={apiTweetListCallback}
                    setCurrUser={setCurrUser} className="profile-view" 
                    handleLoadNextResponse={handleLoadNextResponse} homeProfile isProfile isRoot/>}/>
              <Route exact path='profile/:username' element={<ProfileComponent currUser={currUser} callback={apiTweetListCallback}
                  setCurrUser={setCurrUser} className="profile-view" handleLoadNextResponse={handleLoadNextResponse} nextUrl={nextUrl} isProfile/>}/>
              <Route exact path='explore' element={<Explore currUser={currUser} />}/>
              <Route exact path=':tweetId' element={<TweetDetail currUser={currUser}/>} />
              <Route exact path='messages' element={<MessageHub />}/>
              <Route exact path='settings' element={<Settings/>}/>
            </Routes>
            <InfoBar currUser={currUser}/>
        </div>
    )
  }
  
export default Home;
