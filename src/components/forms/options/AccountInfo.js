import React from 'react'

const AccountInfo = ({isSelected, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, theme, setToDelete}) => {
  if (isSelected) {
    return (
      <>
        <div className="options-desc">Update your account information</div>
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
      </>
    )
  }
}

export default AccountInfo