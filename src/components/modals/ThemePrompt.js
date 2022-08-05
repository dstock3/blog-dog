import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const ThemePrompt = ({themeCheck, setThemeCheck, theme}) => {
    if (!themeCheck) return null
    return ReactDOM.createPortal(
        <div className={"theme-prompt " + theme}>
            <div className="close-theme-modal" onClick={()=> setThemeCheck(false)}>X</div>
            <div className="theme-msg">Want to change your theme?</div>
            <div className={"theme-link-container " + theme + "-accent"}>Check out your <Link className="theme-link" to='/options'>Options</Link>.</div>
        </div>,
        document.getElementById('theme-modal')
    )
}

export default ThemePrompt