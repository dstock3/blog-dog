import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';

const DeleteUser = ({setIsLoggedIn, theme, userInfo, toDelete, setToDelete}) => {
    const [message, setMessage] = useState("")
    const nav = useNavigate()

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            let token = localStorage.getItem('user')

            let res = await fetch("https://stormy-waters-34046.herokuapp.com/" + userInfo["profileName"] + "/delete", {
                
                method: "DELETE",
                headers: { 'Content-Type': 'application/json', "login-token" : token }
                });

            let resJson = await res.json();

            if (res.status === 200) {
                localStorage.clear();
                setIsLoggedIn(false)
                nav('/');
            } else {
                console.log(res)
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }

    if (!toDelete) return null
    return ReactDOM.createPortal(
        <div className={"delete-prompt " + theme + "-accent"}>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <div className="delete-user-prompt">
                We're sorry to see you go. Are you sure you want to delete your account? This will result in the permanent deletion of all your data.
            </div>
            <div className="delete-options">
                <div className={"delete-btn " + theme} onClick={handleDelete}>Confirm</div>
                <div className={"delete-btn " + theme} onClick={() => setToDelete(false)}>Cancel</div>
            </div>
        </div>,
        document.getElementById('user-delete-modal')
    )
}

export default DeleteUser


