import React, { useEffect, useState } from 'react'
import Header from '../sections/Header'
import Compose from '../forms/Compose'
import Footer from '../sections/Footer'
import { useLocation } from 'react-router-dom'
import { parseJwt } from '../../auth/parseToken'

const ComposePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const loc = useLocation()

  const [articleUpdate, setArticleUpdate] = useState(false)

  const fetchUser =  async() => {
    setIsLoading(true)

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
                  setUserInfo(resJson.users[prop])
                    
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

  useEffect(()=> {
    if (loc) {
      setArticleUpdate(loc.state)
    }
    fetchUser()
  }, [])

  return (
    <div className={`App ${userInfo.themePref}-accent`}>
      <Header theme={userInfo.themePref} title={userInfo.blogTitle}/>
      {!errorMessage ? 
        <Compose isLoggedIn={isLoggedIn} getUserData={fetchUser} userInfo={userInfo} articles={userInfo.articles} update={articleUpdate} theme={userInfo.themePref}/> :
        <div className="error-message">{errorMessage}</div>}


      <Footer theme="dark" />
    </div>  
  )
}

export default ComposePage