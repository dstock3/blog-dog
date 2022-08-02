import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Settings from "../basics/Settings";

const Header = ({thisUser, isLoggedIn, theme, title, profileName}) => {
    const [thisTheme, setThisTheme] = useState("dark")

    useEffect(()=> {
        if (theme) {
            setThisTheme(theme)
        }
    }, [theme])
    
    return (
        <header className={thisTheme}>
            {thisUser ? <div className="welcome">{"Welcome "} 
                <Link to = {{pathname: `/${thisUser.profileName}`}}>
                    {thisUser.profileName}
                </Link>
            </div> : null}
            <h1 className="title">
                {profileName ?
                    <Link to = {{pathname: `/${profileName}`}}>{title}</Link> :
                    <Link to = {{pathname: '/'}}>BlogDog - Simple CMS</Link>
                }
            </h1>
            <Settings isLoggedIn={isLoggedIn} theme={theme} /> 
        </header>
    );
}


export default Header