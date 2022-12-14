import React, { useEffect, useState } from 'react'
import Header from '../sections/Header'
import Footer from '../sections/Footer'
import { parseJwt } from '../../auth/parseToken'
import OptionsForm from '../forms/options/OptionsForm'

const OptionsPage = () => {
  const [thisUser, setThisUser] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  return (
    <div className={"App " + thisUser.themePref + "-accent"}>
      <Header isLoggedIn={isLoggedIn} thisUser={thisUser} userInfo={thisUser} theme={thisUser.themePref} title={thisUser.blogTitle} profileName={thisUser.profileName} />
      <OptionsForm userInfo={thisUser} theme={thisUser.themePref} setIsLoggedIn={setIsLoggedIn} />
      <Footer theme={thisUser.themePref} />
    </div>
  )
}

export default OptionsPage