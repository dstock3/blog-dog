import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import menuIcon from '../../assets/hamburger_menu.svg';

const Settings = ({theme, isLoggedIn}) => {
    const [optionsStatus, setOptionsStatus] = useState("hidden")

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
                <img src={menuIcon} alt="menu icon"></img>
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