import './styles.css'

export function NavbarListItemComponent({content, active}) {

    function listIcon() {
        if (content === 'Home') {
            if (active) {
                return <i className="fas fa-home bold"></i>
            }
            return <i className="fas fa-home text-thin"></i>
        } else if (content === 'Profile') {
            if (active) {
                return <i className="fas fa-user-circle"></i>
            }
            return <i className="far fa-user-circle"></i>
        } else if (content === 'Settings') {
            if (active) {
                return <i className="fas fa-cog bold"></i>
            }
            return <i className="fas fa-cog"></i>
        } else if (content === 'Messages') {
            if (active) {
                return <i className="fas fa-envelope"></i>
            }
            return <i className="far fa-envelope"></i>
        } else if (content === 'Explore') {
            return <i className="fas fa-hashtag"></i>
        } else if (content === 'Logout') {
            return <i className="fa-solid fa-arrow-up-left-from-circle"></i>
        }
    }

    return (
        <>
            <div className={`navbar__list-item`}>
                <div className='list-item__icon'>{listIcon()}</div>
                <div className={`list-item__content ${active && 'bold'}`}>{content && content}</div>
            </div>   

        </>
    )
}