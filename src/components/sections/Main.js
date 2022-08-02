import React, { useEffect, useState } from 'react'
import Article from '../basics/Article';
import Prompt from '../basics/Prompt';
import Sidebar from '../basics/Sidebar';
import '../style/main.css'
import { Link } from 'react-router-dom';

const Main = ({isLoggedIn, getUserData, users, landing, article, articles, userInfo, theme, layout, setUpdate}) => {
    const [thisArticle, setThisArticle] = useState(false)
    const [message, setMessage] = useState(false)
    const [commentMessage, setCommentMessage] = useState("")
    const [comments, setComments] = useState(false)
    
    useEffect(() => {
        window.scrollTo(0, 0)

        if (!landing) {
            fetchArticle(article._id)
        } else {
            getUserData()
        }
    }, [])

    const fetchArticle =  async(articleId) => {
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setThisArticle(resJson.article)
                
            } else if (res.status === 400) {
                setMessage("Your session has timed out. Please sign in again.")

            } else {
                setMessage("Some error occured");
            }
        } catch(err) {
            setMessage("Some error occured");
        }
    }

    if (userInfo) {
        return (
            <main className="blog">
                <Sidebar isLoggedIn={isLoggedIn} userInfo={userInfo} articles={articles} theme={theme} fetchArticle={fetchArticle} />
                {!landing && thisArticle ?
                    <div className={"articles-container " + layout}>
                        {message ? <div className="message">{message}</div> : null }
                        <Article getUserData={getUserData} users={users} userInfo={userInfo} articleId={thisArticle._id} article={thisArticle} theme={theme} layout={layout} setUpdate={setUpdate}  comments={comments} commentMessage={commentMessage} setCommentMessage={setCommentMessage} setComments={setComments}/>
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
    } else {
        return (
            <Prompt />
        )
    }
}

export default Main;