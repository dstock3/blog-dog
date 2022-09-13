import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import menuIcon from '../../assets/hamburger_menu.svg';
import menuIconBlack from '../../assets/hamburger_menu_black.svg';

const Settings = ({theme, isLoggedIn, isHovered, setIsHovered}) => {
    const [optionsStatus, setOptionsStatus] = useState("hidden")
    const [menuImg, setMenuImg] = useState(menuIcon)
    const [thisTheme, setThisTheme] = useState(theme)

    useEffect(()=> {
        if (isHovered) {
            let themeHover = theme + "-hovered"
            setThisTheme(themeHover)
        } else {
            setThisTheme(theme)
        }

    }, [isHovered])

    useEffect(()=> {
        const whiteSet = ["dark", "forest"]
        const blackSet = ["light", "artic", "azure"]

        for (let i = 0; i < whiteSet.length; i++) {
            if (theme === whiteSet[i]) {
                setMenuImg(menuIcon)
            }
        }

        for (let i = 0; i < blackSet.length; i++) {
            if (theme === blackSet[i]) {
                setMenuImg(menuIconBlack)
            }
        }
    }, [theme])

    useEffect(() => {

    }, [optionsStatus])

    const toggleStatus = () => {
        if (optionsStatus === "hidden") {
            setOptionsStatus("visible")
        }
        if (optionsStatus === "visible") {
            setOptionsStatus("hidden")
        }
    }

    return (
        <>
            <div onClick={toggleStatus} className="settings-icon">
                <img src={menuImg} alt="menu icon"></img>
            </div>
            <div className={"settings-dropdown " + optionsStatus + " " + thisTheme} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}> 
                <ul className="options-list">
                    {
                        isLoggedIn ?
                            <>
                                <li className="option-item">
                                    <Link to ="/blog-dog/" onClick={() => setOptionsStatus("hidden")}>Home</Link>
                                </li>
                                <li className="option-item">
                                    <Link to = "/blog-dog/compose" onClick={() => setOptionsStatus("hidden")}>Compose</Link>
                                </li>
                                <li className="option-item">
                                    <Link to ="/blog-dog/options" onClick={() => setOptionsStatus("hidden")}>Options</Link>
                                </li>
                                <li className="option-item">
                                    <Link to ="/blog-dog/logout" onClick={() => setOptionsStatus("hidden")}>Logout</Link>
                                </li>
                            </> :
                            <>
                                <li className="option-item">
                                    <Link to ="/blog-dog/login" onClick={() => setOptionsStatus("hidden")}>Sign In</Link>
                                </li>
                                <li className="option-item">
                                    <Link to ="/blog-dog/register" onClick={() => setOptionsStatus("hidden")}>Register</Link>
                                </li>
                            </>
                    }
                </ul>
            </div>
        </>
    );
}

export default Settings;