import React, { useState, useEffect } from 'react'
import '../style/options.css'
import '../style/register.css'
import DeleteUser from '../modals/DeleteUser'

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

    useEffect(()=> {
        let modal = document.getElementById('user-delete-modal')
        let rootElement = document.getElementById('root')

        if (toDelete) {
            modal.style.zIndex = 1000
            rootElement.style.filter = 'brightness(55%)'
            rootElement.style.transition = "all 0.75s ease-out"
            
        } else {
            modal.style.zIndex = 0
            rootElement.style.filter = "unset"
            rootElement.style.transform = "unset"
        }

    }, [toDelete])

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

            if (res.status === 200) {
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
            } else if (res.status === 400) {
                setMessage("Your session has timed out."); 
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
                        <label className="reg-label-drop" htmlFor="themePref">Theme Preference: 
                            <select id="drop-one" name="themePref" value={themePref} onChange={(e) => setThemePref(e.target.value)}>
                                <option defaultValue className="theme-option light-option" value="light">
                                    Light
                                </option>
                                <option className="theme-option dark-option" value="dark">
                                    Dark
                                </option>
                                <option className="theme-option artic-option" value="artic">
                                    Artic
                                </option>
                                <option className="theme-option forest-option" value="forest">
                                    Forest
                                </option>
                                <option className="theme-option azure-option" value="azure">
                                    Azure
                                </option>
                            </select>
                        </label>

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
            </>
        </>
    )
}

export default Options