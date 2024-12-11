import React, { useEffect, useRef } from 'react';
import sidebar from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import User from './User/User'

const Sidebar = ({isSidebarOpen, toggleSidebar}) => {
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar(); 
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen, toggleSidebar]);

    return(
        <>
            {/* Бургер-меню */}
            <div className={`${sidebar.sidebar__burger_menu} ${isSidebarOpen ? sidebar.open : ''}`}
            onClick={toggleSidebar}>
                <span className={sidebar.sidebar__burger_line}></span>
                <span className={sidebar.sidebar__burger_line}></span>
                <span className={sidebar.sidebar__burger_line}></span>
            </div>

            {/* Сайдбар */}
            <div ref={sidebarRef} className={`${sidebar.sidebar} ${isSidebarOpen ? sidebar.open : ''}`}>
                <div className={sidebar.sidebar__content}>
                    <div className={sidebar.sidebar__user}>
                        <User />
                    </div>
                    <div className={sidebar.sidebar__pages}>
                        <NavLink to="/languages">My languages</NavLink>
                        <NavLink to="/words">My words</NavLink>
                        <NavLink to="/dictation">Dictation</NavLink>
                        <NavLink to="/settings">Settings</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;