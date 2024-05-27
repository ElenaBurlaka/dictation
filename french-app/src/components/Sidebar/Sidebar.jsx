import sidebar from './Sidebar.module.css'
import user_photo from './../../images/user-photo.png'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return(
        <div className={sidebar.sidebar}>
            <div className={sidebar.sidebar__user}>
                <img src={user_photo} alt=''></img>
                <p>Olena Burlaka</p>
            </div>
            <div className={sidebar.sidebar__pages}>
                <NavLink to='/languages'>My languages</NavLink>
                <NavLink to='/words'>My words</NavLink>
                <NavLink to='/settings'>Settings</NavLink>
            </div>
        </div>
    )
}

export default Sidebar;