// import { useState } from 'react';
import dictation from './Dictation.module.css'
import { NavLink } from 'react-router-dom';

const Dictation = () => {

    return(
        <div className={dictation.dictation}>
            <NavLink to='/startDictation'>Start dictation</NavLink>
            <NavLink to='/customize'>Customize dictation</NavLink>
            <NavLink to='/customize'>Verb dictation</NavLink>
        </div>
    )
}

export default Dictation;