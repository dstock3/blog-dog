import React, { useState, useEffect } from 'react'
import Article from '../basics/Article';
import Sidebar from '../basics/Sidebar';
import ThemePrompt from '../modals/ThemePrompt';

const Home = ({isLoggedIn, userInfo, theme, users, layout, isAdmin}) => {
    const [articleList, setArticleList] = useState(false)
    const [themeCheck, setThemeCheck] = useState(false)

    useEffect(()=> {
        let themeModal = document.getElementById("theme-modal")
        if ((isLoggedIn) && (theme === "dark")) {
            setThemeCheck(true)   
            themeModal.style.zIndex = 1000
        } else {
            themeModal.style.zIndex = 0
        }
    }, [])

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
            <>
            <main className={"home " + theme + "-accent"}>
                <Sidebar isLoggedIn={isLoggedIn} userInfo={userInfo} theme={theme} isHome={true} isAdmin={isAdmin} />
                <div className={"articles-container " + layout}>
                    {articleList.map((thisArticle, artIndex) => (
                         <Article key={artIndex} index={thisArticle["ind"]} author={thisArticle["author"]["profileName"]} userInfo={thisArticle["author"]} article={thisArticle["article"]} theme={theme} layout="basic" limit={true} isHome={true} isAdmin={isAdmin} />
                    ))}
                </div>
            </main>
            {themeCheck ? 
                <ThemePrompt themeCheck={themeCheck} setThemeCheck={setThemeCheck} theme={theme}/> : null}
            </>
        )
    }
}

export default Home