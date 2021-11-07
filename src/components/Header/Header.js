import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

import classes from './headerStyle.module.scss';

function Header() {

    // Menu open state
    const [menuOpen, setMenuOpen] = useState(false)
    // Width of the screen
    const [ width, setWidth] = useState(0)

    //Function to toggleMenu state
    const handleToggle = () => {
        setMenuOpen(!menuOpen)
    }

    // function called on resize event and setting the width of the screen
    const handleResize = () => {
        setWidth(window.innerWidth)
    }

    // To get the width of the screen 
    useEffect(() => {
        window.addEventListener("resize",handleResize)

        //Clean up function to remove the event listner
        return () => window.removeEventListener("resize",handleResize)
    }, [])

    //To close menu when the screen is not in mobile mode
    useEffect(() => {
        if(width > 400 && menuOpen){
            setMenuOpen(false)
        }
    }, [width, menuOpen])


    return (
        <>
            <div className={classes.header}>
                <nav className={classes.header__navbar}>
                    <div className={`${classes.header__navbar__links} ${menuOpen ? classes.isMenu : ""}`}>
                        <ul>
                            <Link to="/">
                                <li>Home</li>
                            </Link>
                            <Link to="/api">
                                <li>API</li>
                            </Link>
                            <Link to="/copy?q=CopyThisText">
                                <li>Clipboard</li>
                            </Link>
                            <Link to="/selfie">
                                <li>Selfie</li>
                            </Link>
                        </ul>
                    </div>
                </nav>
                <div onClick={handleToggle} className={classes.header__navbar__toggle}>
                   {!menuOpen ? <div> <span></span>
                                    <span></span>
                                    <span></span>
                                </div> : "Close"
                    }
                </div>
            </div>
        </>
    )
}

export default Header
