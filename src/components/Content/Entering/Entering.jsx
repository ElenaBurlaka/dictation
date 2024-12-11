import { NavLink } from 'react-router-dom';
import entering from './Entering.module.css'
import Signup from './Registration/Signup';
import { useState } from 'react';
import MyWords from '../MyWords/MyWords';

const Entering = () => {
const [showSignup, setShowSignup] = useState(false)

const handleSignupButtonClick = () => {
    setShowSignup(true)
}

    return(
        <div className={entering.entering}>
            {/* <MyWords /> */}
            {!showSignup && (
                <div className={entering.entering__button}>
                    <MyWords />
                    {/* <NavLink to='/login'><button onClick={handleSignupButtonClick}><span>Log in</span></button></NavLink> */}
                </div>
            )}
            {/* {!showSignup && ( */}
            {/* //     <div className={entering.entering__button}> */}
            {/* //         <NavLink to='/signup'><button onClick={handleSignupButtonClick}><span>Sign up</span></button></NavLink> */}
            {/* //     </div> */}
            {/* // )} */}
            {/* // {showSignup && <Signup />} } */}
        </div>
    )
}

export default Entering;