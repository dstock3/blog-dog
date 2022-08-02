import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import { parseJwt } from '../../auth/parseToken.js'

const ArticlePage = () => {
    const { username, articleId } = useParams();
    const [article, setArticle] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [author, setAuthor] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [user, setUser] = useState(false)
    const [articleUpdate, setArticleUpdate] = useState(false)

    useEffect(()=> {
        let newUser = localStorage.getItem('user');

        if (newUser) {setIsLoggedIn(true)}
    }, [])

    const fetchArticle =  async() => {
        setIsLoading(true)
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setArticle(resJson.article)
                setAuthor(resJson.author)
                setIsLoading(false)
            } else if (res.status === 400) {
                setErrorMessage("Your session has timed out. Please sign in again.")
            } else {
                setErrorMessage(`Error Code ${res.status} There was a problem loading user data.`);
            }
        } catch(err) {
            setErrorMessage("There was a problem loading user data: " + err);
        }
    }

    useEffect(()=> {
        fetchArticle()
    }, [])

    if (article && author) {
        return (
            <div className={"App " + author.themePref + "-accent"}>
                <Header thisUser={user} userInfo={author} profileName={username} theme={author.themePref} title={author.blogTitle} />
                <Main isLoggedIn={isLoggedIn} errorMessage={errorMessage} userInfo={author} landing={false} article={article} articles={author.articles} theme={author.themePref} layout={author.layoutPref} setUpdate={setArticleUpdate} />
                <Footer theme={author.themePref} />
            </div>
        )
    } else {
        return (
            <div>Loading</div>
        )
    }
}

export default ArticlePage