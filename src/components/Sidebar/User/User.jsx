import user from './User.module.css'
import user_photo from './../../../images/user-photo.png'

const User = () => {
    return(
        <div className={user.user}>
            <img src={user_photo} alt='User'></img>
            <p>Olena Burlaka</p>
        </div>
    )
}

export default User;