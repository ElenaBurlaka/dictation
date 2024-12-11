import myAccount from './MyAccount.module.css'
import close from './../../../images/close.png'
import User from '../User/User';
import edit from './../../../images/edit.png'
import leave from './../../../images/leave.png'

const MyAccount = ({onClose}) => {
    return(
        <div className={myAccount.myAccount}>
            <div className={myAccount.myAccount__wrapper}>
                <div className={myAccount.myAccount__content}>
                <button className={myAccount.myAccount__content_close} onClick={onClose}><img src={close} alt='Close' /></button>
                <div className={myAccount.myAccount__content_content}>
                    <div className={myAccount.myAccount__account}>
                        <User />
                    </div>
                    <div className={myAccount.myAccount__settings}>
                        <div className={myAccount.myAccount__settings_function}>
                            <img src={edit} alt='Edit'></img>
                            <p>change name</p>
                        </div>
                        <div className={myAccount.myAccount__settings_function}>
                            <img src={edit} alt='Edit'></img>
                            <p>change photo</p>
                        </div>
                    </div>
                </div>
                <div className={myAccount.myAccount__leave}>
                    <img className={myAccount.myAccount__leave_icon} src={leave} alt='Leave'></img>
                    <p className={myAccount.myAccount__leave_text}>Leave account</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;