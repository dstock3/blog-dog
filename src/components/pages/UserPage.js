import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";

const UserPage = () => {
    const { username } = useParams();
    const [thisUser, setThisUser] = useState(false)
    const [userInfo, setUserInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState(false)
    
    const fetchUser =  async() => {
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/${username}`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setUserInfo(resJson.user[0])
            } else if (res.status === 400) {
                //setMessage("Your session has timed out. Please sign in again.")

            } else {
                //setMessage("Some error occured");
            }
        } catch(err) {
            //setMessage("Some error occured");
        }
    }

    useEffect(() => {

        fetchUser()
    }, [])

    if (userInfo) {
        return (
            <div className={"App " + userInfo.themePref + "-accent"}>
                {/* need to get info for logged in user, if applicable...pass thisUser to Header */}
                <Header userInfo={userInfo} theme={userInfo.themePref} title={userInfo["blogTitle"]} profileName={userInfo.profileName} />
                <Main getUserData={fetchUser} landing={true} userInfo={userInfo} index={false} articles={userInfo.articles} theme={userInfo.themePref} layout={userInfo.layoutPref} />
                <Footer theme={userInfo.themePref} />
            </div>
        )
    } else {
        return (
            <div>Loading</div>
        )
    }

}

export default UserPage