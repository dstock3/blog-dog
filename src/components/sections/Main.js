import React, { useEffect, useState } from 'react'
import Article from '../basics/Article';
import Prompt from '../basics/Prompt';
import Sidebar from '../basics/Sidebar';
import '../style/main.css'
import { Link } from 'react-router-dom';

const Main = ({errorMessage, isLoggedIn, getUserData, users, landing, article, articles, userInfo, theme, layout, setUpdate}) => {
    const [commentMessage, setCommentMessage] = useState("")
    const [comments, setComments] = useState(false)
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className="blog">
            {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
            <Sidebar isLoggedIn={isLoggedIn} userInfo={userInfo} articles={articles} theme={theme} />
            {!landing && article ?
                <div className={"articles-container " + layout}>
                    <Article getUserData={getUserData} isLoggedIn={isLoggedIn} users={users} userInfo={userInfo} articleId={article._id} article={article} theme={theme} layout={layout} setUpdate={setUpdate}  comments={comments} commentMessage={commentMessage} setCommentMessage={setCommentMessage} setComments={setComments}/>
                </div> :
                <div className={"articles-container " + layout}>
                    {articles.length !== 0 ?
                        Object.values(articles).map((articleItem, artIndex) =>
                        <Article key={artIndex} getUserData={getUserData} users={users} articleId={articleItem._id} userInfo={userInfo} article={articles[artIndex]} theme={theme} layout={layout} limit={true} setUpdate={setUpdate} comments={comments} commentMessage={commentMessage} setCommentMessage={setCommentMessage} setComments={setComments} landing={landing}/> ) :
                        <div className={"compose-prompt " + theme}>
                            <p>You haven't written any articles. Would you like to compose a new one?</p>
                            <Link className="compose-link" to="/compose">Compose Article</Link>
                        </div>   
                    }
                </div>
            }
        </main>
    );
}

export default Main;