import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const CommentPrompt = ({prompt, setPrompt, theme}) => {
    if (!prompt) return null
    return ReactDOM.createPortal(
        <div className={"comment-prompt-container " + theme}>
            <div className="close-comment-prompt" onClick={()=>setPrompt(false)}>X</div>
            <div className="comment-msg">Want to offer your thoughts on this article?</div>
            <div className={"comment-prompt-link-container " + theme + "-accent"}>
                <Link className="comment-prompt-link" to='/blog-dog/register'>Create an Account.</Link>
            </div>
        </div>,
        document.getElementById('comment-prompt-modal')
    )
}

export default CommentPrompt