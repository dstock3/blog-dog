import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'

const DeleteArticle = ({theme, toDelete, userInfo, articleId, setToDelete, page, findUser}) => {
    const [message, setMessage] = useState("")
    const nav = useNavigate()

    const handleDelete = async() => {
        let token = localStorage.getItem('user');
        if (token) {
            try {
                let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`, {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json', "login-token" : token }
                    });
                
                let resJson = await res.json();
                
                if (res.status === 200) {
                    console.log("executed")
                    if (page === "article") {
                        findUser()
                        nav(`/blog-dog/${userInfo.profileName}`)
                    } else if (page === "user") {
                        console.log("executed")
                        findUser()
                        //window.location.reload();
                    }   
                }
            } catch(err) {
                setMessage("Some error occured");
            }
        } else {
            setMessage("Invalid credentials");
        }
    }

    if (!toDelete) return null
    return ReactDOM.createPortal(
        <div className={"delete-prompt " + theme + "-accent"}>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <div className="delete-article-prompt">
                Are you sure you want to delete this article?
            </div>
            <div className="delete-options">
                <div className={"delete-btn " + theme} onClick={handleDelete}>Confirm</div>
                <div className={"delete-btn " + theme} onClick={() => setToDelete(false)}>Cancel</div>
            </div>
        </div>,
        document.getElementById('article-delete-modal')
    )
}

export default DeleteArticle