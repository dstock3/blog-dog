import { useState } from 'react';
import { Link } from 'react-router-dom'
import '../style/register.css'

const Register = () => {
    const [email, setEmail] = useState("")
    const [profileName, setProfileName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [profileDesc, setProfileDesc] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [message, setMessage] = useState("")

    let handleSubmit = async (e) => {
        let formData = new FormData();
        formData.append("email", email);
        formData.append("profileName", profileName);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("blogTitle", blogTitle)
        formData.append("profileDesc", profileDesc);
        if (profilePic) { formData.append("profilePic", profilePic) }; 
        
        try {
            let res = await fetch('https://stormy-waters-34046.herokuapp.com/register', {
                method: "POST",
                body: formData
                });

                let resJson = await res.json();
                
                if (res.status === 200) {
                    setEmail("");
                    setProfileName("");
                    setPassword("");
                    setConfirmPassword("");
                    setBlogTitle("");
                    setProfileDesc("");
                    setProfilePic("");
                    setMessage("User created successfully");
                } else {
                    setMessage(`An error occured: ${res.status}`);
                }
        } catch(err) {
            setMessage(`An error occured: ${err}`);
        }
    }

    return (
        <div className={"register dark"}>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <form className="registerForm" action="" method="POST" encType="multipart/form-data">
                <h2 className="form-head">Register</h2>
                <div className="user-register-container" id="email-reg">
                    <label className="reg-label" htmlFor="email">E-mail: </label>
                    <input className="reg-email-input" type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
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

                <div className="user-register-container" id="reg-blogtitle">
                    <label className="reg-label" htmlFor="blogTitle">Blog Title: </label>
                    <input className="blogtitle-input" type="text" value={blogTitle} name="blogTitle" onChange={(e) => setBlogTitle(e.target.value)}></input>
                </div>

                <div className="profile-desc-container">
                    <label className="reg-label" htmlFor="profileDesc">Profile Description: </label>
                    <textarea type="text" value={profileDesc} name="profileDesc" onChange={(e) => setProfileDesc(e.target.value)}></textarea>
                </div>

                <div onClick={handleSubmit} className="submit-btn reg-btn dark-accent">Register</div>
            </form>
            
            <div className="prompt-container">
                <div className="login-prompt">Already Have a Profile?</div>
                <Link className="login-link" to = {{pathname: '/login'}}>Sign In</Link>
            </div>
        </div>
    );
}

export default Register;