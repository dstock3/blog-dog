import { Link } from 'react-router-dom';

const Prompt = () => {
    return (
        <main className="prompt-container">
            <div className="register-prompt">
                <div className="prompt-message">
                    You aren't logged in. Would you like to create a profile?
                </div>

                <Link to = {{pathname: '/register'}}>Register</Link>
            </div>

            <div className="login-prompt">
                <div className="prompt-message">Already have a login?</div>

                <Link to = {{pathname: '/login'}}>Sign In</Link>
            </div>
        </main>
    );
}

export default Prompt;