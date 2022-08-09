import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = ({userInfo, mode, isHome, theme}) => {
    const [thisClass, setThisClass] = useState({picContainer: null, pic: null, profInfo: null})

    useEffect(()=> {
        if (mode === "prof-main") {
            setThisClass({picContainer: "main-pic-container", pic: "main-pic", profInfo: "main-prof-info"})
        } else {
            setThisClass({picContainer: "side-pic-container", pic: "side-pic", profInfo: "side-prof-info"})
        }
    }, [mode])

    return (
        <div className="profile" id={mode}> 
            <div className={"profile-pic-container " + thisClass.picContainer}>
                <img className={"profile-pic " + thisClass.pic} src={userInfo["profilePic"]} alt={"profile-pic for " + userInfo["profileName"]}></img>
            </div>
            <div className={"profile-info " + thisClass.profInfo}>
                <h2 className="profile-name">
                    {mode === "prof-side" ?
                        <Link to = {{pathname: '/' + userInfo["profileName"]}}>
                            {userInfo["profileName"]}
                        </Link> :
                        userInfo["profile-name"]
                    }
                </h2>
                <div className="profile-desc">{userInfo["profileDesc"]}</div>
                {(mode === "prof-main") || (isHome) ?
                    <div className="date-joined">Member since {userInfo["dateJoined"]}</div> :
                    null
                }
            </div>
        </div>
    );
}

export default Profile;