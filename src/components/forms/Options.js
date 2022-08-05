import React, { useState, useEffect } from 'react'
import '../style/options.css'
import '../style/register.css'
import DeleteUser from '../modals/DeleteUser'
import Timeout from '../modals/Timeout'
import themeIcon from '../../assets/drop.svg'
import themeIconBlack from '../../assets/drop_black.svg'

const Options = ({userInfo, theme, setTheme, setIsLoggedIn}) => {
    const [profileName, setProfileName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [profileDesc, setProfileDesc] = useState("");
    const [themePref, setThemePref] = useState("");
    const [layoutPref, setLayoutPref] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [message, setMessage] = useState("")
    const [toDelete, setToDelete] = useState(false)
    const [isTimedout, setIsTimedout] = useState(false)
    const [themeDrop, setThemeDrop] = useState(themeIcon)
    const [isHidden, setIsHidden] = useState(true)
    const [themeClass, setThemeClass] = useState("theme-hidden")
    const [dropClass, setDropClass] = useState("compact")
    const [hoverClassOne, setHoverClassOne] = useState("")
    const [hoverClassTwo, setHoverClassTwo] = useState("")
    const [hoverClassThree, setHoverClassThree] = useState("")
    const [hoverClassFour, setHoverClassFour] = useState("")
    const [hoverClassFive, setHoverClassFive] = useState("")

    useEffect(()=>{
        if (isHidden) {
            setThemeClass("theme-hidden")
            setDropClass("compact")
        } else {
            setThemeClass("")
            setDropClass("")     
        }
    }, [isHidden])

    useEffect(()=> {
        const whiteSet = ["dark", "forest"]
        const blackSet = ["light", "artic", "azure"]

        for (let i = 0; i < whiteSet.length; i++) {
            if (theme === whiteSet[i]) {
                setThemeDrop(themeIcon)
            }
        }

        for (let i = 0; i < blackSet.length; i++) {
            if (theme === blackSet[i]) {
                setThemeDrop(themeIconBlack)
            }
        }
    }, [])

    const selectTheme = (pref, elementIndex) => {
        setThemePref(pref)
        let themeOptionElements = document.getElementsByClassName("theme-option-container")
        let optionElements = Array.from(themeOptionElements);
        
        for (let i = 0; i < optionElements.length; i++) {
            if (i === elementIndex) {
                optionElements[i].id = theme + "-selected"
            } else {
                optionElements[i].removeAttribute('id');
            }
        }
    }

    useEffect(()=> {
        let timeoutModal = document.getElementById('timeout-modal')
        let userDeleteModal = document.getElementById('user-delete-modal')
        let rootElement = document.getElementById('root')

        if (toDelete) {
            userDeleteModal.style.zIndex = 1000
            rootElement.style.filter = 'brightness(55%)'
            rootElement.style.transition = "all 0.75s ease-out"
        } else if (isTimedout) {
            timeoutModal.style.zIndex = 1000
            rootElement.style.filter = 'brightness(55%)'
            rootElement.style.transition = "all 0.75s ease-out"
        } else {
            userDeleteModal.style.zIndex = 0
            timeoutModal.style.zIndex = 0
            rootElement.style.filter = "unset"
            rootElement.style.transform = "unset"
        }
    }, [toDelete, isTimedout])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let body
        if (profilePic) {
            body = JSON.stringify({
                profileName: profileName,
                password: password,
                confirmPassword: confirmPassword,
                blogTitle: blogTitle,
                profileDesc: profileDesc,
                profilePic: profilePic,
                themePref: themePref
            });
        } else {
            body = JSON.stringify({
                profileName: profileName,
                password: password,
                confirmPassword: confirmPassword,
                blogTitle: blogTitle,
                profileDesc: profileDesc,
                themePref: themePref
            });
        }
         
        try {
            let token = localStorage.getItem('user');

            let res = await fetch("https://stormy-waters-34046.herokuapp.com/" + userInfo["profileName"] + "/update", {
                method: "PUT",
                body: body,
                headers: { 'Content-Type': 'application/json', "login-token" : token }
                });

            let resJson = await res.json();

            if (res.status === 400) {
                setIsTimedout(true)
            } else if (res.status === 200) {
                setTheme(themePref)
                setProfileName("");
                setPassword("");
                setConfirmPassword("");
                setBlogTitle("");
                setProfileDesc("");
                setThemePref("");
                setLayoutPref("");
                setProfilePic("");
                setMessage("User updated successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch(err) {
            setMessage("Some error occured");
        }
    }

    return (
        <>
            <main className={"options-page " + theme}>
                <form className="optionsForm" action="" method="PUT">
                    <h2 className="form-head">Options</h2>
                    {message ? 
                        <div className="message">{message}</div> :
                        <div className="options-desc">Update your profile information and preferences</div>}
                    
                    <div className="user-register-container" id="primary-reg">
                        <label className="reg-label" htmlFor="profileName">Username: </label>
                        <input className="reg-user-input" type="text" value={profileName} name="profileName" onChange={(e) => setProfileName(e.target.value)}></input>
                        <label className="upload-img-label">Profile Pic:</label>
                        <input className="upload-img-input" type="file" name="profilePic" onChange={(e) => setProfilePic(e.target.files[0])}></input>
                    </div>

                    <div className="user-pw-container">
                        <label className="reg-label" htmlFor="password">Password: </label>
                        <input type="password" value={password} id="pw-one" name="password" onChange={(e) => setPassword(e.target.value)}></input>

                        <label className="reg-label" htmlFor="confirmPassword">Confirm Password: </label>
                        <input type="password" value={confirmPassword} name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    </div>

                    <div className="user-register-container">
                        <label className="reg-label" htmlFor="blogTitle">Blog Title: </label>
                        <input type="text" value={blogTitle} name="blogTitle" onChange={(e) => setBlogTitle(e.target.value)}></input>
                    </div>

                    <div className="profile-desc-container">
                        <label className="reg-label" htmlFor="profileDesc">Profile Description: </label>
                        <textarea type="text" value={profileDesc} name="profileDesc" onChange={(e) => setProfileDesc(e.target.value)}></textarea>
                    </div>

                    <div className="user-register-dropdowns">
                        <div className={"theme-dropdown " + theme + "-accent " + dropClass}>
                            <div className="theme-head-container" onClick={()=>setIsHidden(!isHidden)}>
                                <div className="theme-head">Theme Options</div>
                                <img className="theme-drop-indicator" alt="theme dropdown indicator" src={themeDrop}></img>
                            </div>
                            <div className={"theme-options " + theme + " " + themeClass}>
                                <div className={"theme-option-container " + themeClass + " " + hoverClassOne} onMouseEnter={()=>{setHoverClassOne(theme + "-accent")}} onMouseLeave={()=>{setHoverClassOne("")}} onClick={()=>selectTheme("light", 0)}>
                                    <div className="theme-square" id="light-option"></div>
                                    <div className="theme-option">Light</div>
                                </div>
                                <div className={"theme-option-container " + themeClass + " " + hoverClassTwo} onMouseEnter={()=>{setHoverClassTwo(theme + "-accent")}} onMouseLeave={()=>{setHoverClassTwo("")}} onClick={()=>selectTheme("dark", 1)}>
                                    <div className="theme-square" id="dark-option"></div>
                                    <div className="theme-option">Dark</div>
                                </div>
                                <div className={"theme-option-container " + themeClass + " " + hoverClassThree} onMouseEnter={()=>{setHoverClassThree(theme + "-accent")}} onMouseLeave={()=>{setHoverClassThree("")}} onClick={()=>selectTheme("artic", 2)}>
                                    <div className="theme-square" id="artic-option"></div>
                                    <div className="theme-option">Artic</div>
                                </div>
                                <div className={"theme-option-container " + themeClass + " " + hoverClassFour} onMouseEnter={()=>{setHoverClassFour(theme + "-accent")}} onMouseLeave={()=>{setHoverClassFour("")}} onClick={()=>selectTheme("forest", 3)}>
                                    <div className="theme-square" id="forest-option"></div>
                                    <div className="theme-option">Forest</div>
                                </div>
                                <div className={"theme-option-container " + themeClass + " " + hoverClassFive} onMouseEnter={()=>{setHoverClassFive(theme + "-accent")}} onMouseLeave={()=>{setHoverClassFive("")}} onClick={()=>selectTheme("azure", 4)}>
                                    <div className="theme-square" id="azure-option"></div>
                                    <div className="theme-option">Azure</div>
                                </div>
                            </div>
                        </div>

                        <label className="reg-label-drop" htmlFor="layoutPref">Layout Preference: 
                            <select id="drop-two" name="layoutPref" value={layoutPref} onChange={(e) => setLayoutPref(e.target.value)}>
                                <option value="basic">Basic</option>
                                <option value="card">Card</option>
                            </select>
                        </label>
                    </div>

                    <div onClick={handleSubmit} className={"options-btn " + theme + "-accent"}>Update Profile</div>
                </form>
                <div className="deleteForm">
                    <div className={"submit-btn " + theme + "-accent"} onClick={()=> setToDelete(true)}>Delete Profile</div>
                </div>
            </main>
            <>
                {toDelete ?
                    <DeleteUser setIsLoggedIn={setIsLoggedIn} theme={theme} userInfo={userInfo} toDelete={toDelete} setToDelete={setToDelete} />
                    : null}
                {isTimedout ? 
                    <Timeout isTimedout={isTimedout} theme={theme}/> : null}
            </>
        </>
    )
}

export default Options