import React, { useState, useEffect } from 'react'
import OptionsSidebar from './OptionsSidebar'
import DisplaySettings from './DisplaySettings'
import DeleteUser from '../../modals/DeleteUser'
import Timeout from '../../modals/Timeout'
import BlogInfo from './BlogInfo'
import AccountInfo from './AccountInfo'
import ProfilePic from './ProfilePic'
import '../../style/options.css'

const OptionsForm = ({userInfo, theme, setIsLoggedIn}) => {
    const [email, setEmail] = useState("");
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

    const [blogInfoSelect, setBlogInfoSelect] = useState(true)
    const [accountInfoSelect, setAccountInfoSelect] = useState(false)
    const [picSelect, setPicSelect] = useState(false)
    const [displaySelect, setDisplaySelect] = useState(false)
    
    const toggleOption = (opt) => {
        if (opt === "blogInfo") {
            setBlogInfoSelect(true)
            setAccountInfoSelect(false)
            setDisplaySelect(false)
            setPicSelect(false)
        } else if (opt === "profilePic") {
            setPicSelect(true)
            setBlogInfoSelect(false)
            setDisplaySelect(false)
            setAccountInfoSelect(false)
        } else if (opt === "displaySettings") {
            setDisplaySelect(true)
            setBlogInfoSelect(false)
            setPicSelect(false)
            setAccountInfoSelect(false)
        } else if (opt === "accountInfo") {
            setAccountInfoSelect(true)
            setBlogInfoSelect(false)
            setPicSelect(false)
            setDisplaySelect(false)
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
        let formData = new FormData();
        if (email) { formData.append("email", email) };
        if (profileName) { formData.append("profileName", profileName) };
        if (password) { formData.append("password", password) };
        if (confirmPassword) { formData.append("confirmPassword", confirmPassword) };
        if (blogTitle) { formData.append("blogTitle", blogTitle) };
        if (profileDesc) { formData.append("profileDesc", profileDesc) };
        if (themePref) { formData.append("themePref", themePref) };
        if (layoutPref) { formData.append("layoutPref", layoutPref) };
        if (profilePic) { formData.append("profilePic", profilePic) };

        try {
            let token = localStorage.getItem('user');

            let res = await fetch("https://stormy-waters-34046.herokuapp.com/" + userInfo["profileName"] + "/update", {
                method: "PUT",
                body: formData,
                headers: { "login-token" : token }
                });

            let resJson = await res.json();
            console.log(resJson)

            if (res.status === 400) {
                setIsTimedout(true)
            } else if (res.status === 200) {
                setEmail("");
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
                <OptionsSidebar toggleOption={toggleOption} theme={theme}/>

                <div className="options-container">
                    <h2 className="form-head">Options</h2>
                    
                    {message ? <div className="message">{message}</div> : null}

                    <AccountInfo isSelected={accountInfoSelect} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} theme={theme} setToDelete={setToDelete} />

                    <ProfilePic isSelected={picSelect} setProfilePic={setProfilePic} />

                    <BlogInfo isSelected={blogInfoSelect} profileName={profileName} setProfileName={setProfileName} blogTitle={blogTitle} setBlogTitle={setBlogTitle} profileDesc={profileDesc} setProfileDesc ={setProfileDesc}/>

                    <DisplaySettings isSelected={displaySelect} theme={theme} setThemePref={setThemePref} setLayoutPref={setLayoutPref} />

                    <div className="options-button-container">
                        <div onClick={handleSubmit} className={"options-btn " + theme + "-accent"}>Update Profile</div>
                        <div className={"submit-btn " + theme + "-accent"} onClick={()=> setToDelete(true)}>Delete Profile</div>
                    </div>
                </div>
            </main>
            
            {toDelete ?
                <DeleteUser setIsLoggedIn={setIsLoggedIn} theme={theme} userInfo={userInfo} toDelete={toDelete} setToDelete={setToDelete} />
                : null}
            {isTimedout ? 
                <Timeout isTimedout={isTimedout} theme={theme}/> : null}
        </>
    )
}

export default OptionsForm