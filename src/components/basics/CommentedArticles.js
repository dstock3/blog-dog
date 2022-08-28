import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { decodeEntities } from "../../formatting/decodeEntities.js"

const CommentedArticles = ({theme, fetchArticle}) => {
    const [articleList, setArticleList] = useState([])
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const getArticles = async () => {
        setIsLoading(true)
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setArticleList(resJson.mostCommented)
                setIsLoading(false)
            } else {
                setMessage("Some error occured");
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }

    useEffect(()=> {
        getArticles()
        
    }, [])

    if (articleList) {
        return (
            <div className={"sidebar-articles-container " + theme + "-accent"}>
                {isLoading ?
                    <Spinner theme={theme} isMini={true} /> :
                    <>
                        <h3 className="most-commented-header">Most Commented</h3>
                        <ul className={"most-commented-articles " + theme}>
                            {articleList.length > 0 ?
                                Object.values(articleList).map((listObj, index) =>
                                    <li key={index} className="commented-article-item">
                                        {listObj ?
                                        <Link onClick={()=>fetchArticle(listObj.article.article._id)} to= {{pathname: `/blog-dog/${listObj.user}/${listObj.article._id}`}} state={{theme: theme}}>
                                            {decodeEntities(listObj.article.title)}
                                        </Link> : null
                                        }
                                    </li>
                                ) : null
                            }
                        </ul>
                    </>
                }
            </div>
        )
    } else {
        return (
            <div>
                {message}
            </div>
        )
    };
}


export default CommentedArticles
