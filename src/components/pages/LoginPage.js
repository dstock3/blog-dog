import React, { useEffect } from 'react'
import Header from '../sections/Header'
import Login from '../forms/Login'
import Footer from '../sections/Footer'

const LoginPage = () => {
  useEffect(() => {
    document.title = "BlogDog CMS"  
  }, [])
  
  useEffect(()=> {
    let timeoutModal = document.getElementById('timeout-modal')
    let rootElement = document.getElementById('root')

    rootElement.style.filter = "unset"
    rootElement.style.transition = "unset"
    timeoutModal.style.zIndex = 0
  }, [])

  return (
    <div className="App dark-accent">
      <Header theme="dark" title="BlogDog - Simple CMS" />
      <Login />
      <Footer theme="dark" />
    </div>  
  )
}

export default LoginPage