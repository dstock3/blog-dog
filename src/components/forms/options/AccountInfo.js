import React from 'react'

const AccountInfo = ({isSelected, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, theme, setToDelete}) => {
  const handleSubmit = () => {

  }

  if (isSelected) {
    return (
      <>
        <div className="user-register-container" id="email-reg">
          <label className="reg-label" htmlFor="email">E-mail: </label>
          <input className="reg-email-input" type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)}></input>
          </div>
        <div className="user-pw-container">
          <label className="reg-label" htmlFor="password">Password: </label>
          <input type="password" value={password} id="pw-one" name="password" onChange={(e) => setPassword(e.target.value)}></input>
  
          <label className="reg-label" htmlFor="confirmPassword">Confirm Password: </label>
          <input type="password" value={confirmPassword} name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}></input>
        </div>
        <div className="options-button-container">
          <div onClick={handleSubmit} className={"options-btn " + theme + "-accent"}>Update Profile</div>
          <div className={"submit-btn " + theme + "-accent"} onClick={()=> setToDelete(true)}>Delete Profile</div>
        </div>
      </>
    )
  }
}

export default AccountInfo