import './styles.css'



export const NavOption = ({content, focused, idx, setActiveView}) => {
    const handleClick = (event) => {
        event.preventDefault();
        setActiveView(idx);
    }
    return (
        <li onClick={handleClick} className={`option-item ${focused ? 'focused' : ''}`}>
            <div className={`option-container ${focused ? 'focused' : ''}`}>
                {content}
            </div>
        </li>
    )
}