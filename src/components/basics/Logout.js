import React, { useEffect, useState } from 'react'

const Logout = () => {
    const [logoutMessage, setLogoutMessage] = useState("");

    useEffect(()=> {
        localStorage.clear();
        setLogoutMessage("Thanks for visiting! You are now logged out.")
    }, [])

    return (
        <main className="logout-page dark">
            <div className="logout-message dark-accent">{logoutMessage}</div>
        </main>
        
    )
}

export default Logout