import React, { useEffect, useState } from 'react'
import Header from '../sections/Header'
import Register from '../forms/Register'
import Footer from '../sections/Footer'
import { useLocation } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div className="App dark-accent">
      <Header theme="dark" title="BlogDog - Simple CMS" />
      <Register />
      <Footer theme="dark" />
    </div>
  )
}

export default RegisterPage