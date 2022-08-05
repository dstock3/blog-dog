import React from 'react'
import ReactDOM from 'react-dom'

const DeleteComment = ({theme, toDelete, setToDelete, deleteComment, message}) => {
    if (!toDelete) return null
    return ReactDOM.createPortal(
        <div className={"delete-prompt " + theme + "-accent"}>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <div className="delete-article-prompt">
                Are you sure you want to delete this comment?
            </div>
            <div className="delete-options">
                <div className={"delete-btn " + theme} onClick={deleteComment}>Confirm</div>
                <div className={"delete-btn " + theme} onClick={() => setToDelete(false)}>Cancel</div>
            </div>
        </div>,
        document.getElementById('comment-delete-modal')
    )
}

export default DeleteComment