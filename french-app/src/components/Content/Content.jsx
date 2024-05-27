import content from './Content.module.css'
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Signup from "./Entering/Registration/Signup";
import MyWords from './MyWords/MyWords';
import Entering from './Entering/Entering';

const Content = () => {
    return(
        <div className={content.content}>
            {/* <Entering /> */}
            <Routes>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/' element={<Entering />}></Route>
                <Route path='/words' element={<MyWords />}></Route>
            </Routes>
        </div>
    )
}

export default Content;