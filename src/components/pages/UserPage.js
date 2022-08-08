import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../sections/Header";
import Main from "../sections/Main";
import Footer from "../sections/Footer";
import Spinner from "../basics/Spinner";
import { parseJwt } from "../../auth/parseToken";

const UserPage = () => {
    const { username } = useParams();
    const [thisUser, setThisUser] = useState(false)
    const [userInfo, setUserInfo] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=> {
      let rootElement = document.getElementById("root")
      rootElement.style.filter = 'unset'
      rootElement.style.transition = "unset"
    }, [])

    const fetchUser =  async() => {
        setIsLoading(true)
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/${username}`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setUserInfo(resJson.user[0])
            } else {
                
                setErrorMessage(`Error Code ${res.status} There was a problem loading user data.`) 
            }
        } catch(err) {
            
            setErrorMessage("There was a problem loading user data: " + err)
        }

        let newUser = localStorage.getItem('user');
        
        try {
            let response = await fetch(`https://stormy-waters-34046.herokuapp.com/`, {
              method: "GET"
              });
            let resJson = await response.json();
            
            if (response.status === 200) {
              if (newUser) {
                setIsLoggedIn(true)
                for (let prop in resJson.users) {
                    if (resJson.users[prop]._id === parseJwt(newUser)._id) {
                      setThisUser(resJson.users[prop])
                        
                    }
                  }
                } 
              setIsLoading(false)
            } else {
              setIsLoading(false)
              setErrorMessage(`Error Code ${response.status} There was a problem loading user data.`) 
            }
          } catch(err) {
            setIsLoading(false)
            setErrorMessage("There was a problem loading user data: " + err)
          }
    }

    useEffect(() => {
      
        fetchUser()
    }, [])



    useEffect(() => {
        if (userInfo) { 
          document.title = userInfo.blogTitle 
          console.log(userInfo.layoutPref)
        }  
    }, [userInfo])

    if (isLoading) {
      <div className="App dark-accent">
        <Header theme="dark" title="BlogDog - Simple CMS" />
        <main className="blog dark-accent">
            <Spinner />
        </main>
        <Footer theme="dark" />
      </div> 
    } else if (userInfo) {
        return (
            <div className={"App " + userInfo.themePref + "-accent"}>
                <Header thisUser={thisUser} isLoggedIn={isLoggedIn} userInfo={userInfo} theme={userInfo.themePref} title={userInfo.blogTitle} profileName={userInfo.profileName} />
                <Main errorMessage={errorMessage} getUserData={fetchUser} landing={true} userInfo={userInfo} index={false} articles={userInfo.articles} theme={userInfo.themePref} layout={userInfo.layoutPref} />
                <Footer theme={userInfo.themePref} />
            </div>
        )
    } else if (errorMessage) {
        <div className="App dark-accent">
            <Header theme="dark" title="BlogDog - Simple CMS" />
            <main className="blog dark-accent">
                <div>{errorMessage}</div>
            </main>
            <Footer theme="dark" />
        </div> 
    }
}

export default UserPage