import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";

const ArticlePage = () => {
    const { username, articleId } = useParams();
    const [article, setArticle] = useState({});
    //need to fetch author info
    useEffect(() => {
        const fetchArticle =  async() => {
            try {
                let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`, {
                    method: "GET"
                    });
                let resJson = await res.json();
                
                if (res.status === 200) {
                    setArticle(resJson.article)
                    console.log(article)
                    
                } else if (res.status === 400) {
                    //setMessage("Your session has timed out. Please sign in again.")
    
                } else {
                    //setMessage("Some error occured");
                }
            } catch(err) {
                //setMessage("Some error occured");
            }
        }
        fetchArticle()
    }, [])


    if (article) {
        return (
            <div className={"App " + thisUser["themePref"] + "-accent"}>
                <Header thisUser={user} userInfo={thisUser} profileName={username} theme={thisUser["themePref"]} title={thisUser["blogTitle"]} />
                <Main users={users} userInfo={thisUser} landing={false} article={thisArticle} articles={thisUser["articles"]} theme={thisUser["themePref"]} layout={thisUser["layoutPref"]} setUpdate={setArticleUpdate} />
                <Footer theme={thisUser["themePref"]} />
            </div>
        )
    } else {
        return (
            <div>Loading</div>
        )
    }
}

export default ArticlePage