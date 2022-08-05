import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const Timeout = ({isTimedout, theme}) => {
    if (!isTimedout) return null
    return ReactDOM.createPortal(
        <div className={"timeout-prompt " + theme}>
            <div className="timeout-msg">Your session has timed out.</div>
            <Link className={"timeout-link " + theme + "-accent"} to='/login'>Login</Link> 
        </div>,
        document.getElementById('timeout-modal')
    )
}

export default Timeout