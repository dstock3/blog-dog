import React, { useState, useEffect } from 'react';
import Header from '../sections/Header';
import Home from '../sections/Home';
import Footer from '../sections/Footer';
import Spinner from '../basics/Spinner';

const HomePage = () => {
  const [users, setUsers] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
    
  const fetchUsers = async() => {
    setIsLoading(true)
    let token = localStorage.getItem('user');

    let response 

    if (token) {
      response = await fetch(`https://stormy-waters-34046.herokuapp.com/`, {
        headers: { 'Content-Type': 'application/json', 'login-token' : token },
        method: "GET"
      });
    } else {
      response = await fetch(`https://stormy-waters-34046.herokuapp.com/`, {
        method: "GET"
      });
    }
    
    try {
      if (response.status === 500) {
        try {
          let newRes = await fetch(`https://stormy-waters-34046.herokuapp.com/`, {
            method: "GET"
          });
          setIsLoggedIn(false)
          let newResJson = await newRes.json();
          setUsers(newResJson.users)
          setIsLoading(false)
        } catch(err) {
          setIsLoading(false)
          setErrorMessage("There was a problem loading user data: " + err)
        }
      } else {
        let resJson = await response.json();

        if (response.status === 200) {
          if (resJson.user) {
            setIsLoggedIn(true)
            
            for (let prop in resJson.users) {
              if (resJson.users[prop]._id === resJson.user._id) {
                  setUser(resJson.users[prop])
                  if (resJson.users[prop].admin) {
                    setIsAdmin(true)
                  }
              }
            }
          } else {
            setIsLoggedIn(false)
          }
          setUsers(resJson.users)
          setIsLoading(false)
        } else {
          setIsLoading(false)
          setErrorMessage(`Error Code ${response.status} There was a problem loading user data.`) 
        }
      }
    } catch(err) {
      setIsLoading(false)
      setErrorMessage("There was a problem loading user data: " + err)
    }
  }
    
  useEffect(()=> {
    fetchUsers()
  }, [])

  useEffect(() => {
    document.title = "BlogDog"  
  }, [])

  useEffect(()=> {
    let timeoutModal = document.getElementById('timeout-modal')
    let deleteUserModal = document.getElementById('user-delete-modal')
    let deleteArticleModal = document.getElementById('user-delete-modal')
    let rootElement = document.getElementById('root')

    rootElement.style.filter = "unset"
    rootElement.style.transition = "unset"
    deleteUserModal.style.zIndex = 0
    deleteArticleModal.style.zIndex = 0
    timeoutModal.style.zIndex = 0
  }, [])

  if (isLoading) {
    /* Loading page */
    <div className="App dark-accent">
        <Header theme="dark" title="BlogDog - Simple CMS" />
        <Spinner theme="dark" />
        <Footer theme="dark" />
    </div>
  } else if (users && isLoggedIn) {
    /* If request for users is successful and the user is logged in */
    return (
      <div className={"App " + user.themePref + "-accent"}>
        <Header isLoggedIn={isLoggedIn} userInfo={user} theme={user.themePref} title={user.blogTitle} />
        <Home isLoggedIn={isLoggedIn} theme={user.themePref} userInfo={user} layout={user.layoutPref} users={users} isAdmin={isAdmin} />
        <Footer theme={user.themePref} />
      </div>
      ) 
  } else if (users && !isLoggedIn) {
    /* If request for users is successful and user is not logged in... */
    return (
      <div className="App dark-accent">
        <Header theme="dark" title="BlogDog - Simple CMS" />
        <Home theme="dark" users={users} />
        <Footer theme="dark" />
      </div> 
    )
  } else if (errorMessage) {
    /* If request for users fails */
    return (
      <div className="App dark-accent">
        <Header theme="dark" title="BlogDog - Simple CMS" />
        <main className="home dark-accent">
          <div>{errorMessage}</div>
        </main>
        <Footer theme="dark" />
      </div>
    )
  } 
}

export default HomePage