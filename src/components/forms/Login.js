import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/login.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPw] = useState("")
    const [message, setMessage] = useState("")
    const nav = useNavigate()

    const loginHandler = async (e) => {
        e.preventDefault();

        axios
            .post('https://stormy-waters-34046.herokuapp.com/login', { email, password })
            .then((res) => {
                if (res.status === 200) {
                    setEmail("")
                    setPw("")
                    
                    localStorage.setItem('user', res.data);
                    nav('/');
                } else {
                    setMessage("Some error occurred")
                }
              })
            .catch((err) => {
                if (err.response.status === 401) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage("Some error occured");
                }  
            });  
    }

    return (
        <div className={"login dark"}>
            <form className="loginForm" action="" method="POST">
                <h2 className="form-head">Login</h2>
                <div className="message">{message ? <p>{message}</p> : null}</div>
                <div className="user-login-container">
                    <label className="log-label" htmlFor="email">E-mail: </label>
                    <input
                        autoFocus
                        type="text" 
                        name="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required>
                    </input>
                </div>

                <div className="user-password-container">
                    <label className="log-label" htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPw(e.target.value)}
                        required>    
                    </input>
                </div>

                <div onClick={loginHandler} className="log-btn dark-accent">Login</div>
            </form>
            <div className="prompt-container">
                <div className="reg-prompt">Don't have an Account?</div>
                <Link to = {{pathname: '/blog-dog/register'}}>Register</Link>
            </div>
        </div>
    );
}

export default Login;