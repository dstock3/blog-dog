import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import menuIcon from '../../assets/hamburger_menu.svg';
import menuIconBlack from '../../assets/hamburger_menu_black.svg';

const Settings = ({theme, isLoggedIn}) => {
    const [optionsStatus, setOptionsStatus] = useState("hidden")
    const [menuImg, setMenuImg] = useState(menuIcon)

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
    }, [])

    useEffect(()=> {
        console.log(theme)
    }, [])

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
            <div className={"settings-dropdown " + optionsStatus + " " + theme}>
                <ul className="options-list">
                    {
                        isLoggedIn ?
                            <>
                                <li className="option-item">
                                    <Link to ="/" onClick={() => setOptionsStatus("hidden")}>Home</Link>
                                </li>
                                <li className="option-item">
                                    <Link to = "/compose" onClick={() => setOptionsStatus("hidden")}>Compose</Link>
                                </li>
                                <li className="option-item">
                                    <Link to ="/options" onClick={() => setOptionsStatus("hidden")}>Options</Link>
                                </li>
                                <li className="option-item">
                                    <Link to ="/logout" onClick={() => setOptionsStatus("hidden")}>Logout</Link>
                                </li>
                            </> :
                            <>
                                <li className="option-item">
                                    <Link to ="/login" onClick={() => setOptionsStatus("hidden")}>Sign In</Link>
                                </li>
                                <li className="option-item">
                                    <Link to ="/register" onClick={() => setOptionsStatus("hidden")}>Register</Link>
                                </li>
                            </>
                    }
                </ul>
            </div>
        </>
    );
}

export default Settings;