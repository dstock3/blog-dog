import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
const Timeout = ({isTimedout, theme}) => {
    if (!isTimedout) return null
    return ReactDOM.createPortal(
        <div className={"timeout-prompt " + theme + "-accent"}>
            <div className={"timeout-msg" + theme}>Your session has timed out.</div>
            <Link to='/login'>Login</Link> 
        </div>,
        document.getElementById('timeout-modal')
    )
}

export default Timeout