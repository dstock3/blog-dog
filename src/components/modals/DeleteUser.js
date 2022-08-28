import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';
import Timeout from './Timeout';

const DeleteUser = ({setIsLoggedIn, theme, userInfo, toDelete, setToDelete, isAdmin}) => {
    const [message, setMessage] = useState("")
    const [isTimedout, setIsTimedout] = useState(false)
    const nav = useNavigate()

    const handleDelete = async (e) => {
        e.preventDefault();
        let res
        let token = localStorage.getItem('user')

        if (isAdmin) {
            res = await fetch("https://stormy-waters-34046.herokuapp.com/" + userInfo["profileName"], {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json', "login-token" : token }
                });
        } else {
            res = await fetch("https://stormy-waters-34046.herokuapp.com/" + userInfo["profileName"] + "/delete", {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json', "login-token" : token }
                });
        }

        try {
            let resJson = await res.json();
            
            if (res.status === 400) {
                let deleteUserModal = document.getElementById("user-delete-modal")
                deleteUserModal.style.zIndex = 0
                let timedOutModal = document.getElementById("timeout-modal");
                timedOutModal.style.zIndex = 1000
                setIsTimedout(true)
            } else if (res.status === 200) {
                if (!isAdmin) {
                    localStorage.clear();
                    setIsLoggedIn(false)
                }

                nav('/blog-dog/');
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
            {isAdmin ?
                <div className="delete-user-prompt">    
                    Are you sure you want to delete this account? This will result in the permanent deletion of this user's data.
                </div> :
                <div className="delete-user-prompt">    
                We're sorry to see you go. Are you sure you want to delete your account? This will result in the permanent deletion of all your data.
                </div>            
            }

            <div className="delete-options">
                <div className={"delete-btn " + theme} onClick={handleDelete}>Confirm</div>
                <div className={"delete-btn " + theme} onClick={() => setToDelete(false)}>Cancel</div>
            </div>
            {isTimedout ?
                <Timeout isTimedout={isTimedout} theme={theme} /> : null}
        </div>,
        document.getElementById('user-delete-modal')
    )
}

export default DeleteUser


