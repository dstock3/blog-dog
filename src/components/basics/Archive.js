import { Link } from "react-router-dom";

const Archive = ({userInfo, articles, fetchArticle, theme}) => {
    return (
        <div className="archive">
            <ul className="archive-list main-archive-list">
                {articles.length === 0 ?
                    <div>You currently haven't composed any articles.</div> :
                    Object.values(articles).map((article, index) => {
                        return (
                            <li className="archive-link-item" key={index}>
                                <Link onClick={()=> fetchArticle()} to={'/' + userInfo["profileName"] + '/' + article._id} state={{theme: theme}}>
                                        {article["title"]}
                                </Link>
                            </li>)
                    })
                }
                
            </ul>
        </div>
    );
}

export default Archive;