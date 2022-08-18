import React, { useState, useEffect } from 'react'
import OptionsSidebar from './OptionsSidebar'
import DisplaySettings from './DisplaySettings'
import DeleteUser from '../../modals/DeleteUser'
import Timeout from '../../modals/Timeout'
import BlogInfo from './BlogInfo'
import AccountInfo from './AccountInfo'

const OptionsForm = ({userInfo, theme, setIsLoggedIn}) => {
    const [email, setEmail] = useState(userInfo.email);
    const [profileName, setProfileName] = useState(userInfo.profileName);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [blogTitle, setBlogTitle] = useState(userInfo.blogTitle);
    const [profileDesc, setProfileDesc] = useState(userInfo.profileDesc);
    const [themePref, setThemePref] = useState(userInfo.themePref);
    const [layoutPref, setLayoutPref] = useState(userInfo.layoutPref);
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
            setAccountInfoSelect(false)
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

    return (
        <>
            <main className={"options-page " + theme}>
                <OptionsSidebar toggleOption={toggleOption} theme={theme}/>

                <div className="options-container">
                    <h2 className="form-head">Options</h2>
                    <div className="options-desc">Update your profile information and preferences</div>
                    
                    {message ? <div className="message">{message}</div> : null}

                    <AccountInfo isSelected={accountInfoSelect} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} theme={theme} setToDelete={setToDelete} />

                    <BlogInfo isSelected={blogInfoSelect} profileName={profileName} setProfileName={setProfileName} blogTitle={blogTitle} setBlogTitle={setBlogTitle} profileDesc={profileDesc} setProfileDesc ={setProfileDesc}/>

                    <DisplaySettings isSelected={displaySelect} theme={theme} setThemePref={setThemePref} setLayoutPref={setLayoutPref} />
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