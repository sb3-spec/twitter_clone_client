import Tweet from '../../tweets/components/Tweet'
import {ProfileResult} from '../explore'

import './styles.css'


export const ListWidget = ({currUser, items, profile, header}) => {
       

    return (
        <div className="widget__outer">
            <div className="widget__header">
                <h4 className="widget__title">{header}</h4>
            </div>
            <div className="widget__inner">
                {items && items.map((item, idx) => !profile ? <Tweet  tweet={item} key={idx} currentUser={currUser} /> : <ProfileResult item={item} key={idx} currUser={currUser} />)}
            </div>
            
        </div>
    );
}