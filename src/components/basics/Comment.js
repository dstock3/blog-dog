import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { parseJwt } from '../../auth/parseToken.js';
import { decodeEntities } from "../../formatting/decodeEntities.js";
import DeleteComment from "../modals/DeleteComment.js";
import Timeout from "../modals/Timeout.js";

const Comment = ({ comment, articleAuthor, articleId, setUpdate, theme, isAdmin, fetchArticle, findUser, fetchComments }) => {
    const [message, setMessage] = useState("")
    const [authorizedToDelete, setAuthorizedToDelete] = useState(false)
    const [fullyAuthorized, setFullyAuthorized] = useState(false)
    const [toDelete, setToDelete] = useState(false)
    const [isTimedOut, setIsTimedOut] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(()=> {
        let rootElement = document.getElementById('root')
        let deleteCommentModal = document.getElementById("comment-delete-modal")
        if (isDeleted) {
            fetchArticle()
            findUser()
            fetchComments(articleId)
            deleteCommentModal.style.zIndex = 0
            rootElement.style.filter = 'unset'
            rootElement.style.transition = "unset"
            window.scrollTo({top: 0})
        }
    }, [isDeleted])
    
    useEffect(()=> {
        let rootElement = document.getElementById('root')
        let deleteCommentModal = document.getElementById("comment-delete-modal")
        if (toDelete) {
            deleteCommentModal.style.zIndex = 1000
            rootElement.style.filter = 'brightness(65%)'
            rootElement.style.transition = "all 0.75s ease-out"
        } else {
            deleteCommentModal.style.zIndex = 0
            rootElement.style.filter = 'unset'
            rootElement.style.transition = "unset"
        }
    }, [toDelete])

    const authorizeComment = () => {
        let thisUser = localStorage.getItem('user')

        if (thisUser) {
            let parsedUser = parseJwt(thisUser)
            //if the user is the author of both the article and the comment itself, authorize to delete and edit
            if (parsedUser._id === articleAuthor._id && parsedUser._id === comment.userId) {
                setFullyAuthorized(true) 
            } else if (parsedUser._id === articleAuthor._id && parsedUser._id !== comment.userId) { 
                //if the user is the author of the article, authorize to delete
                setAuthorizedToDelete(true)
            } else if (parsedUser._id === comment.userId && parsedUser._id !== articleAuthor._id ) {
                //if user is author of the comment itself, authorize to delete and edit
                setFullyAuthorized(true)
            } else {
                setFullyAuthorized(false)
                setAuthorizedToDelete(false)
            }
        }
    }

    useEffect(()=> {
        authorizeComment()
    }, [comment, articleAuthor])

    const editComment = async () => {
        setUpdate({"content": comment.content, "commentId": comment._id})
    }
    
    const deleteComment = async () => {
        let token = localStorage.getItem('user');

        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}/${comment._id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json', "login-token" : token }
                });
            let resJson = await res.json();

            if (res.status === 400) {
                setIsTimedOut(true)
                let deleteCommentModal = document.getElementById("comment-delete-modal")
                deleteCommentModal.style.zIndex = 0
                let timedOutModal = document.getElementById("timeout-modal");
                timedOutModal.style.zIndex = 1000

            } else if (res.status === 200) {
                setIsDeleted(true)
            } else {
                setMessage("Some error occurred")
            }
        } catch(err) {
            setMessage("Some error occurred")
        }
    }

    return (
        <>
            {message ? <div className="message">{message}</div> : null }
            <li className={"comment " + theme}>
                <div className="comment-primary-container">
                    <span className="comment-username">
                        <Link to={`/blog-dog/${comment.profileName}`}>{comment.profileName}</Link>: </span>
                    <span className="comment-content" style={{whiteSpace: "pre-wrap"}}>{decodeEntities(comment.content)}</span>
                    {comment.isEdited ? 
                        <div className="comment-date">Edited on {comment.date}</div> :
                        <div className="comment-date">Posted on {comment.date}</div>
                    } 
                </div>
                <div className="comment-dashboard">
                    {authorizedToDelete ?
                        <div className={"comment-edit-btn " + theme + "-accent"} onClick={()=>setToDelete(true)}>Delete</div> : null}
                    {fullyAuthorized || isAdmin ?
                        <>
                            <div className={"comment-edit-btn " + theme + "-accent"} onClick={editComment}>Edit</div>
                            <div className={"comment-edit-btn " + theme + "-accent"} onClick={()=>setToDelete(true)}>Delete</div>
                        </> : null
                    }
                </div>
            </li>
            {toDelete ?
                <DeleteComment theme={theme} message={message} toDelete={toDelete} deleteComment={deleteComment} setToDelete={setToDelete} /> : null}
            {isTimedOut ?
                <Timeout isTimedout={isTimedOut} theme={theme} /> : null}
        </>

    );
}

export default Comment;