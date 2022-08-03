import Archive from './Archive';
import '../style/sidebar.css';
import { Link } from 'react-router-dom';
import Intro from './Intro';
import CommentedArticles from './CommentedArticles';
import Profile from './Profile';

const Sidebar = ({isLoggedIn, articles, userInfo, theme, isHome}) => {
    if (isHome) {
        return (
            <div className={"sidebar " + theme}>
                {isLoggedIn ? 
                    <>
                        <Profile mode="prof-side" isHome={isHome} userInfo={userInfo} theme={theme} />
                        <Link className="compose-link" to="/compose" state={{articleUpdate: false}}>Compose New Article</Link>
                        <CommentedArticles isHome={isHome} theme={theme} />
                    </> : 
                    <>
                        <Intro theme={theme}/>
                        <CommentedArticles isHome={isHome} theme={theme} />
                    </>
                }
            </div>
        );
    } else {
        return (
            <div className={"sidebar " + theme}>
                <Profile mode="prof-side" userInfo={userInfo} theme={theme} />
                <Archive userInfo={userInfo} articles={articles} theme={theme} />
                <CommentedArticles theme={theme} />
            </div>
        );
    }

}

export default Sidebar;