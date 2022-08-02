import { useState, useEffect } from "react";
import Prompt from "../basics/Prompt";
import { parseJwt } from "../../auth/parseToken.js"

const CommentForm = ({users, userInfo, articleId, theme, update, fetchComments }) => {
    const [comment, setComment] = useState("")
    const [message, setMessage] = useState("")
    const [author, setAuthor] = useState("")
    const [method, setMethod] = useState("POST")
    const [request, setRequest] = useState(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`)
    const [commentLabel, setCommentLabel] = useState()

    useEffect(()=> {
        setRequest(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`)
        setMethod("POST")
        
    }, [articleId])

    useEffect(()=> {
        if (update) {
            setComment(update.content)
            setMethod("PUT")
            setRequest(`https://stormy-waters-34046.herokuapp.com/article/${articleId}/${update.commentId}`)
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

    const commentHandler = async(e) => {
        e.preventDefault();
        
        try {
            let token = localStorage.getItem('user');
            
            let res = await fetch(request, {
                method: method,
                body: JSON.stringify({
                    profileName: author.profileName,
                    content: comment
                    }),
                headers: { 'Content-Type': 'application/json', "login-token" : token }
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setComment("");
                fetchComments(articleId)
                window.location.reload(false);
            } else {
                setMessage("Some error occured");
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
        
    }
    
    if (userInfo) {
        return (
            <form className={"comment-form " + theme + "-accent"} action="" method="POST">
                <div className="comment-subcontainer comment-prompt">
                    <label className="comment-label" htmlFor="comment">
                        {update ?
                            "Edit Your Comment" : "Leave a Comment Below"
                        }
                    </label>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
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
        );
    } else {
        return (
            <Prompt />
        )
    }
}

export default CommentForm;