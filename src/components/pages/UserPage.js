import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import Spinner from "../basics/Spinner";

const UserPage = () => {
    const { username } = useParams();
    const [thisUser, setThisUser] = useState(false)
    const [userInfo, setUserInfo] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const fetchUser =  async() => {
        setIsLoading(true)
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/${username}`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setUserInfo(resJson.user[0])
                console.log(userInfo)
                console.log(userInfo.layoutPref)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setErrorMessage(`Error Code ${res.status} There was a problem loading user data.`) 
            }
        } catch(err) {
            setIsLoading(false)
            setErrorMessage("There was a problem loading user data: " + err)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (!isLoading && userInfo) {
        return (
            <div className={"App " + userInfo.themePref + "-accent"}>
                {/* need to get info for logged in user, if applicable...pass thisUser to Header */}
                <Header userInfo={userInfo} theme={userInfo.themePref} title={userInfo.blogTitle} profileName={userInfo.profileName} />
                <Main errorMessage={errorMessage} getUserData={fetchUser} landing={true} userInfo={userInfo} index={false} 
                articles={userInfo.articles} theme={userInfo.themePref} layout={userInfo.layoutPref} />
                <Footer theme={userInfo.themePref} />
            </div>
        )
    } else {
        return (
            <Spinner />
        )
    }
}

export default UserPage