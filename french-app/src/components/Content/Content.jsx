import content from './Content.module.css'
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Signup from "./Entering/Registration/Signup";
import MyWords from './MyWords/MyWords';
import Entering from './Entering/Entering';
import Dictation from './Dictation/Dictation';
import { useEffect, useState } from 'react';
import StartDictation from './Dictation/StartDictation/StartDictation';

const Content = () => {

    const [formData, setFormData] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem('wordsData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    return(
        <div className={content.content}>
            <Routes>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/' element={<Entering />}></Route>
                <Route path='/words' element={<MyWords />}></Route>
                <Route path='/dictation' element={<Dictation formData={formData} />}></Route>
                <Route path='/startDictation' element={<StartDictation formData={formData} />}></Route>
            </Routes>
        </div>
    )
}

export default Content;