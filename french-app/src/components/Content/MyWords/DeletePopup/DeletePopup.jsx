import deletePopup from './DeletePopup.module.css'
import close from './../../../../images/close.png'

const DeletePopup = ({onClose, index, onDelete}) => {

const handleRemoveFromLocalStorage = () => {
    onDelete(index);
}

    return(
        <div className={deletePopup.deletePopup}>
            <div className={deletePopup.deletePopup__wrapper}>
                <div className={deletePopup.deletePopup__content}>
                <button className={deletePopup.deletePopup__content_close} onClick={onClose}><img src={close} alt='Close' /></button>
                    <div className={deletePopup.deletePopup__notice}>
                        <p>Are you sure you want to delete 
                        the word with all its sentences?</p>
                        <div className={deletePopup.deletePopup__buttons}>
                            <button onClick={onClose}>Oh, no</button>
                            <button onClick={handleRemoveFromLocalStorage}>Yes, I'm sure</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletePopup;