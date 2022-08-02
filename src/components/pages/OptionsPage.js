import React, { useState } from 'react'
import Header from '../sections/Header'
import Footer from '../sections/Footer'
import Options from '../forms/Options'

const OptionsPage = () => {
  const [theme, setTheme] = useState(false)
  return (
    <div className={"App " + theme + "-accent"}>
      {/*
      <Header userInfo={user} theme={theme} title={user.blogTitle} profileName={user.profileName} />
      <Options setTheme={setTheme} userInfo={user} theme={theme} setIsLoggedIn={setIsLoggedIn} />
      <Footer theme={theme} />
      */}
    </div>
  )
}

export default OptionsPage