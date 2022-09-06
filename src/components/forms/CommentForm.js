import { useState, useEffect } from "react";
import Prompt from "../basics/Prompt";
import { parseJwt } from "../../auth/parseToken.js"
import Timeout from "../modals/Timeout";

const CommentForm = ({commentFormClass, setComments, users, userInfo, articleId, theme, update, fetchArticle, findUser, fetchComments}) => {
    const [comment, setComment] = useState("")
    const [message, setMessage] = useState(false)
    const [method, setMethod] = useState("POST")
    const [request, setRequest] = useState(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`)
    const [isTimedout, setIsTimedout] = useState(false)
    const [author, setAuthor] = useState(false)
    const [isEdited, setIsEdited] = useState(false)

    useEffect(()=> {
        setRequest(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`)
        setMethod("POST")
        
    }, [articleId])

    useEffect(()=> {
        if (update) {
            setComment(update.content)
            setMethod("PUT")
            setRequest(`https://stormy-waters-34046.herokuapp.com/article/${articleId}/${update.commentId}`)
            setIsEdited(true)
        }
    }, [update, articleId])

    useEffect(()=> {
        let newUser = localStorage.getItem('user');
        
        if (newUser) {
            let parsedUser = parseJwt(newUser)
            
            for (let prop in users) {
                if (users[prop]._id === parsedUser._id) {
                    let thisUser = users[prop]
                    setAuthor(thisUser)
                }   
            }
        }
    }, [])

    useEffect(()=> {
        let modal = document.getElementById('timeout-modal')
        let rootElement = document.getElementById('root')
        if (isTimedout) {
            modal.style.zIndex = 1000
            rootElement.style.filter = 'brightness(65%)'
            rootElement.style.transition = "all 0.75s ease-out"
        } else {
            modal.style.zIndex = 0
            rootElement.style.filter = "unset"
            rootElement.style.transition = "unset"
        }

    }, [isTimedout])

    const commentHandler = async(e) => {
        e.preventDefault();
        
        try {
            let token = localStorage.getItem('user');
            
            let res = await fetch(request, {
                method: method,
                body: JSON.stringify({
                    profileName: author.profileName,
                    content: comment,
                    isEdited: isEdited
                    }), 
                headers: { 'Content-Type': 'application/json' , "login-token" : token }
                });
            let resJson = await res.json();

            if (res.status === 400) {
                setIsTimedout(true)
            } else if (res.status === 200) {
                if (resJson.errors) {
                    setMessage(console.log(resJson.errors[0].msg))
                } else {
                    setComment("");
                    setMessage(resJson.message)
                    setComments(resJson.comments)
                    if (update) {
                        let rootElement = document.getElementById('root')
                        let deleteCommentModal = document.getElementById("comment-delete-modal")
                        
                        fetchArticle()
                        findUser()
                        fetchComments(articleId)
                        deleteCommentModal.style.zIndex = 0
                        rootElement.style.filter = 'unset'
                        rootElement.style.transition = "unset"
                        window.scrollTo({top: 0})
                    }
                }
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }
    
    if (userInfo) {
        return (
            <>
            <form className={"comment-form " + theme + "-accent " + commentFormClass} action="" method="POST">
                <div className="comment-subcontainer comment-prompt">
                    <label className="comment-label" htmlFor="comment">
                        {update ?
                            "Edit Your Comment" : "Leave a Comment Below"
                        }
                    </label>
                    {message ? <div className="message">{message}</div> : null}
                    <textarea className="comment-input" type="text" value={comment} htmlFor="comment" onChange={(e) => setComment(e.target.value)}></textarea>
                </div>
                <div className="comment-btn-subcontainer">
                    <div onClick={commentHandler} className={"comment-btn " + theme}>
                        {update ?
                            "Edit Comment" : "Submit"
                        }
                    </div>
                </div>
            </form>
            <Timeout isTimedout={isTimedout} theme={theme}/>
            </>
        );
    } else {
        return (
            <Prompt />
        )
    }
}

export default CommentForm;