import Prompt from '../basics/Prompt';
import Sidebar from '../basics/Sidebar';
import '../style/compose.css'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Timeout from '../modals/Timeout';

const Compose = ({isLoggedIn, getUserData, userInfo, articles, theme, update }) => {
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")
    const [imgDesc, setImgDesc] = useState("")
    const [content, setContent] = useState("")
    const [message, setMessage] = useState("")
    const [method, setMethod] = useState("POST")
    const [request, setRequest] = useState('https://stormy-waters-34046.herokuapp.com/article/compose')
    const nav = useNavigate()
    const [isTimedout, setIsTimedout] = useState(false)
    const [isEdited, setIsEdited] = useState(false)

    useEffect(()=> {
        if (update) {
            if (update.articleUpdate) {
                setIsEdited(true)
                setContent(update.articleUpdate.content)
                setTitle(update.articleUpdate.title)
                setMethod("PUT")
                setRequest(`https://stormy-waters-34046.herokuapp.com/article/${update.articleUpdate.articleId}`)
            }
        }
    }, [update])

    useEffect(()=> {
        let modal = document.getElementById('timeout-modal')
        let rootElement = document.getElementById('root')
        if (isTimedout) {
            modal.style.zIndex = 1000
            rootElement.style.filter = 'brightness(65%)'
            rootElement.style.transition = "all 0.75s ease-out"
        } else {
            modal.style.zIndex = 0
            rootElement.style.filter = "unset"
            rootElement.style.transition = "unset"
        }

    }, [isTimedout])

    let handleSubmit = async (e) => {
        e.preventDefault();

        let body
        if (img) {
            body = JSON.stringify({
                title: title,
                img: img,
                imgDesc: imgDesc,
                content: content,
                isEdited: isEdited
            })
        } else {
            body = JSON.stringify({
                title: title,
                content: content,
                isEdited: isEdited
            })
        }
        
        try {
            let token = localStorage.getItem('user');

            let res = await fetch(request, {
                    method: method,
                    body: body,
                    headers: { 'Content-Type': 'application/json', "login-token" : token }
                })
            
            let resJson = await res.json();

            if (res.status === 400) {
                setIsTimedout(true)
            } else if (res.status === 200) {
                setTitle("")
                setImg("")
                setImgDesc("")
                setContent("")

                if (update) { 
                    setMessage("Article updated successfully") 
                } else {
                    setMessage("Article created successfully")
                }
                getUserData()
                nav(`/${userInfo.profileName}/${resJson.articleId}`)
            } else {
                setMessage(`Some error occurred: ${res.status}`)
            }
        } catch(err) {
            setMessage(`An error occured: ${err}`);
        }
    }

    if (isLoggedIn) {
        return (
            <>
                <main className="compose-page">
                    <Sidebar userInfo={userInfo} articles={articles} theme={theme} />

                    <form className={"composeForm " + theme} action="" method="POST" encType="multipart/form-data">
                        <div className="message">{message ? <p>{message}</p> : null}</div>
                        <div className="compose-subcontainer compose-title">
                            <label className="compose-label" htmlFor="title">Title:</label>
                            <input className="compose-title-input" value={title} type="text" htmlFor="title" name="title" onChange={(e) => setTitle(e.target.value)}></input>
                        </div>

                        <div className="compose-subcontainer compose-img">
                            <label className="upload-img-label compose-img-label" htmlFor="img">Image:</label>
                            <input className="upload-img-input" type="file" value={img} htmlFor="img" name="img" onChange={(e) => setImg(e.target.files[0])}></input>

                            <label className="compose-label" htmlFor="imgDesc">Image Caption (if applicable):</label>
                            <input className="compose-title-input" value={imgDesc} type="text" htmlFor="imgDesc" name="imgDesc" onChange={(e) => setImgDesc(e.target.value)}></input>
                        </div>

                        <div className="compose-subcontainer compose-body">
                            <label className="compose-label" htmlFor="content">Content:</label>
                            <textarea className="compose-content-input" type="text" value={content} name="content" htmlFor="content" rows="25" onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>

                        <div className="compose-subcontainer compose-options">
                            <div onClick={handleSubmit} className={"submit-btn " + theme + "-accent"}>Submit</div>
                        </div>
                    </form>
                </main>
                <Timeout isTimedout={isTimedout} theme={theme} />
            </>
        );
    } else {
        return (
            <Prompt />
        )
    }
}

export default Compose;