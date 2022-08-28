import Archive from './Archive';
import '../style/sidebar.css';
import { Link } from 'react-router-dom';
import Intro from './Intro';
import CommentedArticles from './CommentedArticles';
import Profile from './Profile';
import composeIcon from '../../assets/write.svg'
import composeIconBlack from '../../assets/write_black.svg'
import { useEffect, useState } from 'react';
import DeleteUser from '../modals/DeleteUser';

const Sidebar = ({isLoggedIn, articles, userInfo, theme, isHome, isAdmin}) => {
    const [composeImg, setComposeImg] = useState(composeIcon)
    const [toDelete, setToDelete] = useState(false)

    useEffect(()=> {
        let timeoutModal = document.getElementById('timeout-modal')
        let userDeleteModal = document.getElementById('user-delete-modal')
        let rootElement = document.getElementById('root')

        if (toDelete) {
            userDeleteModal.style.zIndex = 1000
            rootElement.style.filter = 'brightness(55%)'
            rootElement.style.transition = "all 0.75s ease-out"
        }  else {
            userDeleteModal.style.zIndex = 0
            timeoutModal.style.zIndex = 0
            rootElement.style.filter = "unset"
            rootElement.style.transform = "unset"
        }
        
    }, [toDelete])

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
                        <Link className="compose-link" to="/blog-dog/compose" state={{articleUpdate: false}}>
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
            <>
                <div className={"sidebar " + theme}>
                    <Profile mode="prof-side" userInfo={userInfo} theme={theme} />
                    <Archive userInfo={userInfo} articles={articles} theme={theme} />
                    {isAdmin ? 
                        <div className={"user-delete-btn " + theme + "-accent"} onClick={() => setToDelete(true)}>Delete User</div> : null
                    }
                    <CommentedArticles theme={theme} />
                </div>
                <DeleteUser isAdmin={isAdmin} theme={theme} userInfo={userInfo} toDelete={toDelete} setToDelete={setToDelete} />
            </>
        );
    }

}

export default Sidebar;