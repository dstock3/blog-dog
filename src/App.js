import React from 'react'
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage';
import LogoutPage from './components/pages/LogoutPage';
import OptionsPage from './components/pages/OptionsPage';
import RegisterPage from './components/pages/RegisterPage';
import ArticlePage from './components/pages/ArticlePage'
import UserPage from './components/pages/UserPage'
import ComposePage from './components/pages/ComposePage';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route exact path="/" element={<HomePage/>} />

        {/* Register */}
        <Route path="/register" element={<RegisterPage/>} />

        {/* Login */}
        <Route path="/login" element={<LoginPage/>} />

        {/* Logout */}
        <Route path="/logout" element={<LogoutPage/>} />

        {/* Create Article */}
        <Route path="/compose" element={<ComposePage/>} />

        {/* Profile Options */}
        <Route path="/options" element={<OptionsPage/>} />

        {/* User Page */}
        <Route path="/:username" element={<UserPage/>} />

        {/* Article Page */}
        <Route path="/:username/:articleId" element={<ArticlePage/>} />
      </Routes>
    </Router>
  )
}

export default App

