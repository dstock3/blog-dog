import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { decodeEntities } from "../../formatting/decodeEntities";
import Spinner from "./Spinner";
import defaultImg from "../../assets/paw.png"

const Profile = ({userInfo, mode, isHome, theme}) => {
    const [thisClass, setThisClass] = useState({picContainer: null, pic: null, profInfo: null})
    const [profilePic, setProfilePic] = useState(null)
    const [imgIsLoading, setImgIsLoading] = useState(false)

    useEffect(()=> {
        if (userInfo.profilePic === undefined) {
            setProfilePic(defaultImg)
            setImgIsLoading(false)
        }
    }, [])

    useEffect(()=> {

        (async() => {
            setImgIsLoading(true)
            if (userInfo.profilePic !== undefined) {
                try {
                    let imgRes = await fetch(`https://stormy-waters-34046.herokuapp.com/images/${userInfo.profilePic}`, {
                        method: "GET"
                    });

                    if (imgRes.status === 200) {
                        let imgResBlob = await imgRes.blob();
                        let imgSrc = URL.createObjectURL(imgResBlob)
                        setProfilePic(imgSrc)
                        setImgIsLoading(false)
                    }
                } catch(err) {
                    console.log(err)
                };
            };
        })();
    }, [userInfo])

    useEffect(()=> {
        if (mode === "prof-main") {
            setThisClass({picContainer: "main-pic-container", pic: "main-pic", profInfo: "main-prof-info"})
        } else {
            setThisClass({picContainer: "side-pic-container", pic: "side-pic", profInfo: "side-prof-info"})
        }
    }, [mode])

    return (
        <div className="profile" id={mode}>
            <Link to = {{pathname: '/' + userInfo["profileName"]}}>
                <div className={"profile-pic-container " + thisClass.picContainer}>
                    {imgIsLoading ? 
                        <Spinner theme={theme} isMini={true} userPic={true} /> :
                        <img className={"profile-pic " + thisClass.pic} src={profilePic} alt={"profile-pic for " + userInfo["profileName"]}></img>
                    }
                </div>
            </Link>

            <div className={"profile-info " + thisClass.profInfo}>
                <h2 className="profile-name">
                    {mode === "prof-side" ?
                        <Link to = {{pathname: '/blog-dog/' + userInfo["profileName"]}}>
                            {userInfo["profileName"]}
                        </Link> :
                        userInfo["profile-name"]
                    }
                </h2>
                <div className="profile-desc">{decodeEntities(userInfo["profileDesc"])}</div>
                {(mode === "prof-main") || (isHome) ?
                    <div className="date-joined">Member since {userInfo["dateJoined"]}</div> :
                    null
                }
            </div>
        </div>
    );
}

export default Profile;