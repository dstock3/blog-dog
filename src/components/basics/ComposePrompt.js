import React from 'react'
import { Link } from 'react-router-dom'

const ComposePrompt = ({isAuthorized, theme, composeImg}) => {
    if (isAuthorized) {
        return (
            <div className={"compose-prompt " + theme}>
                <p>You haven't written any articles. Would you like to compose a new one?</p>
                <Link className="compose-link compose-prompt-container" to="/blog-dog/compose">
                    <img src={composeImg} alt="compose-article-icon"></img>
                    <p>Compose Article</p>
                </Link>
            </div> 
          )
    } else {
        <div className={"compose-prompt user-message " + theme}>
            <p>This user hasn't written any articles.</p>
        </div>
    }
}

export default ComposePrompt