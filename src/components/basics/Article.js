import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentForm from "../forms/CommentForm";
import { parseJwt } from '../../auth/parseToken.js'
import DeleteArticle from "../modals/DeleteArticle";
import expandComment from "../../assets/expand.svg";
import expandCommentBlack from "../../assets/expand_black.svg";
import CommentSection from "../sections/CommentSection";

const Article = ({ isLoggedIn, fetchArticle, users, article, articleId, userInfo, theme, layout, limit, author, comments, setComments, commentMessage, setCommentMessage, landing }) => {
    const [abstract, setAbstract] = useState(article["content"])
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [commentUpdate, setCommentUpdate] = useState(false)
    const [showComments, setShowComments] = useState(true)
    const [toDelete, setToDelete] = useState(false)
    const [expandImg, setExpandImg] = useState(expandComment)
    const [articleClass, setArticleClass] = useState("")

    useEffect(()=> {
        if (!landing) {
            setArticleClass("single-view")
        }

    }, [landing])

    useEffect(()=> {
        const whiteSet = ["dark", "forest"]
        const blackSet = ["light", "artic", "azure"]

        for (let i = 0; i < whiteSet.length; i++) {
            if (theme === whiteSet[i]) {
                setExpandImg(expandComment)
            }
        }

        for (let i = 0; i < blackSet.length; i++) {
            if (theme === blackSet[i]) {
                setExpandImg(expandCommentBlack)
            }
        }

    }, [])

    const fetchComments = async (articleId) => {
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}/comments`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setComments(resJson.comments)
            } else {
                setCommentMessage("Some error occured");
            }
        } catch(err) {
            setCommentMessage("Some error occured");
        }
    }
    
    useEffect(()=> {
        if (articleId) {
            fetchComments(articleId)
        }
    }, [articleId])
    
    useEffect(()=> {
        let modal = document.getElementById('article-delete-modal')
        let rootElement = document.getElementById('root')
        if (toDelete) {
            modal.style.zIndex = 1000
            rootElement.style.filter = 'brightness(65%)'
            rootElement.style.transition = "all 0.75s ease-out"
        } else {
            modal.style.zIndex = 0
            rootElement.style.filter = "unset"
            rootElement.style.transition = "unset"
        }
    }, [toDelete])

    useEffect(()=> {
        /* check if this is an article authored by the user */
        let token = localStorage.getItem('user');
        if (token) {
            let userData = parseJwt(token)
            if (userData._id === userInfo._id) {
                setIsAuthorized(true)
            }
        }
        /* create an article preview */
        if (article["content"].length > 400) {
            let dif = article["content"].length - 400;
            setAbstract(article["content"].substring(0, article["content"].length - dif))
        }
    }, [])

    return (
        <article className={articleClass + " " + theme + " " + layout + "-child"}>
            <div className="article-head">
                <div className="article-head-subcontainer">
                    <h1 className={"article-name " + layout + "-article-name"}>
                        <Link to={"/" + userInfo["profileName"] + `/${article._id}`}>{article["title"]}</Link>
                    </h1>
                    {author ?
                        <div className="article-author">
                            <Link to ={"/" + userInfo["profileName"]}>
                                {author}
                            </Link>
                        </div> : null}
                    {article.isEdited ? 
                        <div className="date-posted">Edited on {article["date"]}</div> :
                        <div className="date-posted">Posted on {article["date"]}</div>}
                </div>
                    {isAuthorized ?
                        <div className={"article-dashboard " + layout + "-buttons"}>
                            <div className={"article-edit-btn " + theme + "-accent"}>
                                <Link to="/compose" state={{"articleUpdate": {"content": article["content"], "title": article["title"], "articleId": article._id}}}>
                                    Edit
                                </Link>
                            </div>
                            <div className={"article-edit-btn " + theme + "-accent"} onClick={() => setToDelete(true)}>Delete</div>
                        </div> : null}
            </div>

            {article["img"] ?
                layout === "card" ?
                    <div className="img-container img-card-view">
                        <img className="article-img" src={article["img"]} alt={article["img-desc"]}></img>
                        <div className="article-img-caption">{article["img-desc"]}</div>
                    </div> :
                <div className="img-container">
                    <img className="article-img" src={article["img"]} alt={article["img-desc"]}></img>
                    <div className="article-img-caption">{article["img-desc"]}</div>
                </div> :
                null
            }

            {limit ?
                article.content.length < 400 ?
                    <div className="article-content">{article["content"]}</div> :
                    <div className="article-content">
                        {abstract}...
                        <div className="read-more"> 
                            <Link to ={"/" + userInfo["profileName"] + "/" + article._id}>
                                Read More
                            </Link>
                        </div>
                    </div> :
                <>
                    <div className="article-content">
                        {article["content"]}
                    </div>
                    {isLoggedIn ?
                        /* Commenting privileges are only enabled if the user is logged in */
                        <CommentForm setComments={setComments} fetchArticle={fetchArticle} users={users} userInfo={userInfo} articleId={article._id} theme={theme} update={commentUpdate} setShowComments={setShowComments} fetchComments={fetchComments} /> : null
                    }
                    {Object.keys(comments).length !== 0 ?
                        <ul className={"comments-container " + theme + "-accent"}>
                            <div className="comment-head-container">
                                <h3 className="comment-head">Comments {"(" + comments.length + ")"}</h3>
                                <div className={"show-comments-btn " + theme} onClick={()=> setShowComments(!showComments)}>
                                    {showComments ? "Minimize Comments" : "Show Comments"}
                                </div>
                            </div>
                            <div className="message">{commentMessage ? <p>{commentMessage}</p> : null}</div>
                            <CommentSection showComments={showComments} setShowComments={setShowComments} comments={comments} expandComment={expandImg} theme={theme} userInfo={userInfo} article={article} setCommentUpdate={setCommentUpdate} articleId={articleId} />
                        </ul> : 
                        null
                    } 
                </>
            }
            {toDelete ?
                <DeleteArticle theme={theme} toDelete={toDelete} userInfo={userInfo} articleId={articleId} setToDelete={setToDelete} /> : null}
        </article>
    );
}

export default Article;