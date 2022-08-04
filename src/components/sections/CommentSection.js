import React, { useEffect } from 'react'
import Comment from '../basics/Comment'

const CommentSection = ({showComments, setShowComments, comments, expandComment, theme, userInfo, article, setCommentUpdate}) => {
    useEffect(()=> {

    }, [])
    
    if (showComments) {
        return (
        Object.values(comments).map((comment, thisIndex) =>
            <Comment key={thisIndex} articleAuthor={userInfo} comment={comment} articleId={article._id} setUpdate={setCommentUpdate} theme={theme} />
            )
        )
    } else {
        return (
            <div className="comment-icon-container">
                <img onClick={() => setShowComments(!showComments)} src={expandComment} className={"comment-icon " + theme} alt="expand comments icon"></img>
            </div>
        )
    };
}

export default CommentSection