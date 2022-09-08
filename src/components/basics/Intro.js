import React from 'react';
import { Link } from 'react-router-dom';
import pawIcon from '../../assets/paw.png'
import Spinner from './Spinner';

const Intro = ({theme}) => {
  return (
    <div className={"intro-container " + theme + "-accent"}>
      {pawIcon ?
        <div className="logo">
          <img src={pawIcon} alt="BlogDog logo"></img>
        </div> :
        <div className="logo">
          <Spinner theme={theme} isMini={true} imgLoader={true} />
        </div>}
        <div className="intro">Welcome to <b>BlogDog</b>, a content management system designed to maximize ease of use.</div>
      <div className="login-prompt">
          <Link to="/blog-dog/login">Login</Link> to access CMS features.
      </div>
      <div className="register-prompt">
          Don't have an account yet? <Link to="/blog-dog/register">Register</Link> to access features.
      </div>
    </div>
  )
}

export default Intro