import myAccount from './MyAccount.module.css'
import close from './../../../images/close.png'

const MyAccount = ({onClose}) => {
    return(
        <div className={myAccount.myAccount}>
            <div className={myAccount.myAccount__wrapper}>
                <div className={myAccount.myAccount__content}>
                <button className={myAccount.myAccount__content_close} onClick={onClose}><img src={close} alt='Close' /></button>
                    <div className={myAccount.myAccount__notice}>
                        <p>Are you sure you want to delete 
                        the word with all its sentences?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;