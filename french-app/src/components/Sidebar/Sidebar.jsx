import sidebar from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import MyAccount from './MyAccount/MyAccount'
import user_photo from './../../images/user-photo.png'
import { useState } from 'react'

const Sidebar = () => {

    const [showAccountPopup, setShowAccountPopup] = useState(false)

    return(
        <div className={sidebar.sidebar}>
            <div className={sidebar.sidebar__user} onClick={() => setShowAccountPopup(true)}>
            {showAccountPopup && <MyAccount onClose={() => setShowAccountPopup(false)} />}
                <img src={user_photo} alt=''></img>
                <p>Olena Burlaka</p>
            </div>
            <div className={sidebar.sidebar__pages}>
                <NavLink to='/languages'>My languages</NavLink>
                <NavLink to='/words'>My words</NavLink>
                <NavLink to='/dictation'>Dictation</NavLink>
                <NavLink to='/settings'>Settings</NavLink>
            </div>
        </div>
    )
}

export default Sidebar;