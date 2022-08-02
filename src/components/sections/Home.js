import React, { useState, useEffect } from 'react'
import Article from '../basics/Article';
import Sidebar from '../basics/Sidebar';

const Home = ({isLoggedIn, userInfo, theme, users, layout}) => {
    const [articleList, setArticleList] = useState(false)

    function randomizeList(articleList) {
        for (let i = articleList.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [articleList[i], articleList[randomIndex]] = [articleList[randomIndex], articleList[i]];
        }
    }

    useEffect(()=> {
        let list = []
        for (const user in users) {
            let thisUser = users[user]
            for (const article in thisUser.articles) {
                list.push({"author": thisUser, "article": thisUser.articles[article], "ind": parseInt(article)})
            }
        }
        randomizeList(list)
        setArticleList(list)
    }, [])

    if (articleList) {
        return (
            <main className={"home " + theme + "-accent"}>
                <Sidebar isLoggedIn={isLoggedIn} userInfo={userInfo} theme={theme} isHome={true} />
                <div className={"articles-container " + layout}>
                    {articleList.map((thisArticle, artIndex) => (
                         <Article key={artIndex} index={thisArticle["ind"]} author={thisArticle["author"]["profileName"]} userInfo={thisArticle["author"]} article={thisArticle["article"]} theme={theme} layout="basic" limit={true} />
                    ))}
                </div>
            </main>
        )
    }
}

export default Home