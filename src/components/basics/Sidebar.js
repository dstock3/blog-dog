import Archive from './Archive';
import '../style/sidebar.css';
import { Link } from 'react-router-dom';
import Intro from './Intro';
import CommentedArticles from './CommentedArticles';
import Profile from './Profile';
import composeIcon from '../../assets/write.svg'
import composeIconBlack from '../../assets/write_black.svg'
import { useEffect, useState } from 'react';

const Sidebar = ({isLoggedIn, articles, userInfo, theme, isHome}) => {
    const [composeImg, setComposeImg] = useState(composeIcon)


    useEffect(()=> {
        const whiteSet = ["dark", "forest"]
        const blackSet = ["light", "artic", "azure"]

        for (let i = 0; i < whiteSet.length; i++) {
            if (theme === whiteSet[i]) {
                setComposeImg(composeIcon)
            }
        }

        for (let i = 0; i < blackSet.length; i++) {
            if (theme === blackSet[i]) {
                setComposeImg(composeIconBlack)
            }
        }

    }, [])



    if (isHome) {
        return (
            <div className={"sidebar " + theme}>
                {isLoggedIn ? 
                    <>
                        <Profile mode="prof-side" isHome={isHome} userInfo={userInfo} theme={theme} />
                        <Link className="compose-link" to="/compose" state={{articleUpdate: false}}>
                            <img src={composeImg} alt="compose-article-icon"></img>
                            <div>Compose New Article</div>
                        </Link>
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