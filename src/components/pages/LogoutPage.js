import React from 'react'
import Header from '../sections/Header'
import Footer from '../sections/Footer'
import Logout from '../basics/Logout'

const LogoutPage = () => {
  return (
    <div className="App dark-accent">
      <Header theme="dark" title="BlogDog - Simple CMS" />
      <Logout/>
      <Footer theme="dark" />
    </div>
  )
}

export default LogoutPage