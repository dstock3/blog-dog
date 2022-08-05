import React, { useEffect } from 'react'
import Header from '../sections/Header'
import Register from '../forms/Register'
import Footer from '../sections/Footer'

const RegisterPage = () => {
  useEffect(() => {
    document.title = "BlogDog CMS"  
  }, [])

  return (
    <div className="App dark-accent">
      <Header theme="dark" title="BlogDog - Simple CMS" />
      <Register />
      <Footer theme="dark" />
    </div>
  )
}

export default RegisterPage