import React, { useEffect, useState } from 'react'
import Article from '../basics/Article';
import Sidebar from '../basics/Sidebar';
import '../style/main.css'
import {parseJwt} from '../../auth/parseToken.js'
import composeIcon from '../../assets/write.svg'
import composeIconBlack from '../../assets/write_black.svg'
import ComposePrompt from '../basics/ComposePrompt';

const Main = ({errorMessage, fetchArticle, isLoggedIn, getUserData, users, landing, article, articles, userInfo, theme, layout, articleUpdate, userPage, isAdmin}) => {
    const [commentMessage, setCommentMessage] = useState("")
    const [comments, setComments] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [composeImg, setComposeImg] = useState(composeIcon)

    useEffect(()=> {
        const whiteSet = ["dark", "forest"]
        const blackSet = ["light", "artic", "azure"]

        for (let i = 0; i < whiteSet.length; i++) {
            if (theme === whiteSet[i]) {
                setComposeImg(composeIcon)
            }
        }

        for (let i = 0; i < blackSet.length; i++) {
            if (theme === blackSet[i]) {
                setComposeImg(composeIconBlack)
            }
        }
    }, [])
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(()=> {
        if (article) {
            if (article.comments) {
                setComments(article.comments)
            }
        }
    }, [article])

    useEffect(()=> {
        /* check if this is the user's own landing page */
        let token = localStorage.getItem('user');
        if (token) {
            let userData = parseJwt(token)
            if (userData._id === userInfo._id) {
                setIsAuthorized(true)
            }
        }
    }, [])

    return (
        <main className="blog">
            {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
            <Sidebar isLoggedIn={isLoggedIn} userInfo={userInfo} articles={articles} theme={theme} articleUpdate={articleUpdate} isAdmin={isAdmin} />
            {!landing && article ?
                /* For single articles, the basic layout is enabled */
                <div className="articles-container basic">
                    <Article getUserData={getUserData} fetchArticle={fetchArticle} isLoggedIn={isLoggedIn} users={users} userInfo={userInfo} articleId={article._id} article={article} theme={theme} layout={"basic"} comments={comments} commentMessage={commentMessage} setCommentMessage={setCommentMessage} setComments={setComments} isAdmin={isAdmin} />
                </div> :
                articles.length !== 0 ?
                    <div className={"articles-container " + layout}>
                        {Object.values(articles).map((articleItem, artIndex) =>
                            <Article key={artIndex} getUserData={getUserData} fetchArticle={fetchArticle} users={users} articleId={articleItem._id} userInfo={userInfo} article={articles[artIndex]} theme={theme} layout={layout} limit={true} comments={comments} commentMessage={commentMessage} setCommentMessage={setCommentMessage} setComments={setComments} landing={landing} userPage={userPage} isAdmin={isAdmin} /> )}
                    </div> :
                    <div className={"articles-container basic"}>
                        <ComposePrompt isAuthorized={isAuthorized} theme={theme} composeImg={composeImg} />
                    </div>
            }
        </main>
    );
}

export default Main;