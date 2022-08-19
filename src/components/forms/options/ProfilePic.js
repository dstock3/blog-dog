import React from 'react'

const ProfilePic = ({isSelected, setProfilePic}) => {
  if (isSelected) {
    return (
      <div className="user-register-container" id="primary-reg">
        <label className="upload-img-label">Profile Pic:</label>
        <input className="upload-img-input" type="file" name="profilePic" onChange={(e) => setProfilePic(e.target.files[0])}></input>
      </div>    
    )
  }
}

export default ProfilePic