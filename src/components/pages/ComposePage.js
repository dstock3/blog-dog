import React from 'react'
import Header from '../sections/Header'
import Compose from '../forms/Compose'
import Footer from '../sections/Footer'

const ComposePage = () => {

    //need to use an API call to get theme
  return (
    <div className="App dark-accent">
      <Header theme="dark" title="BlogDog - Simple CMS" />
      <Compose />
      <Footer theme="dark" />
    </div>  
  )
}

export default ComposePage