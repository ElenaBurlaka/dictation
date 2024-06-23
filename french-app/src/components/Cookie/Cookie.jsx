import { useState } from 'react';
import cookie from './Cookie.module.css'

const Cookie = () => {

    const [componentOpen, setComponentOpen] = useState(true)

    const handleClose = () => {
        setComponentOpen(false)
    }

    if (!componentOpen) {
        return null
    }

    return(
        <div className={cookie.cookie}>
            <div className={cookie.cookie__content}>
                <p>We don't use cookies because we don't know how to make it</p>
                <button onClick={handleClose}>Okay</button>
            </div>
        </div>
    )
}

export default Cookie;