import React from 'react'
import Header from '../sections/Header'
import Login from '../forms/Login'
import Footer from '../sections/Footer'

const LoginPage = () => {
  return (
    <div className="App dark-accent">
      <Header theme="dark" title="BlogDog - Simple CMS" />
      <Login />
      <Footer theme="dark" />
    </div>  
  )
}

export default LoginPage