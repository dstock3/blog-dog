import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Route exact path="/blog-dog/" element={<HomePage/>} />

        {/* Register */}
        <Route path="/blog-dog/register" element={<RegisterPage/>} />

        {/* Login */}
        <Route path="/blog-dog/login" element={<LoginPage/>} />

        {/* Logout */}
        <Route path="/blog-dog/logout" element={<LogoutPage/>} />

        {/* Create Article */}
        <Route path="/blog-dog/compose" element={<ComposePage/>} />

        {/* Profile Options */}
        <Route path="/blog-dog/options" element={<OptionsPage/>} />

        {/* User Page */}
        <Route exact path="/blog-dog/:username" element={<UserPage/>} />

        {/* Article Page */}
        <Route exact path="/blog-dog/:username/:articleId" element={<ArticlePage/>} />
      </Routes>
    </Router>
  )
}

export default App

