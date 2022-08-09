import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import { parseJwt } from '../../auth/parseToken.js'
import CommentPrompt from "../modals/CommentPrompt";

const ArticlePage = () => {
    const { username, articleId } = useParams();
    const [article, setArticle] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [author, setAuthor] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [user, setUser] = useState(false)
    const [users, setUsers] = useState(false)
    const [prompt, setPrompt] = useState(false)

    useEffect(()=> {
      let commentPromptModal = document.getElementById("comment-prompt-modal")
      if (!isLoggedIn) {
        setPrompt(true)
        commentPromptModal.style.zIndex = 1000
      } else {
        setPrompt(false)
        commentPromptModal.style.zIndex = 0
      }
    }, [isLoggedIn])
    
    const findUser = async() => {
        let newUser = localStorage.getItem('user');
        try {
            let response = await fetch(`https://stormy-waters-34046.herokuapp.com/`, {
              method: "GET"
              });
            let resJson = await response.json();
            
            if (response.status === 200) {
              if (newUser) {
                setIsLoggedIn(true)
                setUsers(resJson.users)
                for (let prop in resJson.users) {
                    if (resJson.users[prop]._id === parseJwt(newUser)._id) {
                      setUser(resJson.users[prop])
                      setIsLoggedIn(true)
                        
                    }
                  }
                } 
              setIsLoading(false)
            } else {
              setIsLoading(false)
              setErrorMessage(`Error Code ${response.status} There was a problem loading user data.`) 
            }
          } catch(err) {
            setIsLoading(false)
            setErrorMessage("There was a problem loading user data: " + err)
          }
        }

    useEffect(()=> {
        findUser()
    
    }, [])

    useEffect(() => {
        if (author) { document.title = author.blogTitle }  
    }, [author])

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
          <>
            <div className={"App " + author.themePref + "-accent"}>
                <Header thisUser={user} isLoggedIn={isLoggedIn} userInfo={author} profileName={username} theme={author.themePref} title={author.blogTitle} />
                <Main users={users} isLoggedIn={isLoggedIn} fetchArticle={fetchArticle} errorMessage={errorMessage} userInfo={author} landing={false} article={article} articles={author.articles} theme={author.themePref} layout={author.layoutPref} />
                <Footer theme={author.themePref} />
            </div>
            <CommentPrompt prompt={prompt} setPrompt={setPrompt} theme={author.themePref} />
          </>
        )
    }
}

export default ArticlePage