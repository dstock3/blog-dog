import React, { useEffect, useState } from 'react'
import Article from '../basics/Article';
import Sidebar from '../basics/Sidebar';
import '../style/main.css'
import { Link } from 'react-router-dom';
import {parseJwt} from '../../auth/parseToken.js'
import composeIcon from '../../assets/write.svg'
import composeIconBlack from '../../assets/write_black.svg'

const Main = ({errorMessage, fetchArticle, isLoggedIn, getUserData, users, landing, article, articles, userInfo, theme, layout, articleUpdate}) => {
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
            <Sidebar isLoggedIn={isLoggedIn} userInfo={userInfo} articles={articles} theme={theme} articleUpdate={articleUpdate} />
            {!landing && article ?
                <div className={"articles-container " + layout}>
                    <Article getUserData={getUserData} fetchArticle={fetchArticle} isLoggedIn={isLoggedIn} users={users} userInfo={userInfo} articleId={article._id} article={article} theme={theme} layout={layout}comments={comments} commentMessage={commentMessage} setCommentMessage={setCommentMessage} setComments={setComments}/>
                </div> :
                <div className={"articles-container " + layout}>
                    {articles.length !== 0 ?
                        Object.values(articles).map((articleItem, artIndex) =>
                        <Article key={artIndex} getUserData={getUserData} fetchArticle={fetchArticle} users={users} articleId={articleItem._id} userInfo={userInfo} article={articles[artIndex]} theme={theme} layout={layout} limit={true} comments={comments} commentMessage={commentMessage} setCommentMessage={setCommentMessage} setComments={setComments} landing={landing}/> ) :
                        isAuthorized ?
                            <div className={"compose-prompt " + theme}>
                                <p>You haven't written any articles. Would you like to compose a new one?</p>
                                <Link className="compose-link compose-prompt-container" to="/compose">
                                    <img src={composeImg} alt="compose-article-icon"></img>
                                    <p>Compose Article</p>
                                </Link>
                            </div> :   
                            <div className={"compose-prompt user-message " + theme}>
                                <p>This user hasn't written any articles.</p>
                            </div>
                    }
                </div>
            }
        </main>
    );
}

export default Main;