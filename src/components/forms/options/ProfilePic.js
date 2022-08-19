import React from 'react'

const ProfilePic = ({theme, isSelected, setProfilePic}) => {
  if (isSelected) {
    return (
      <>
        <div className="options-desc">Update your profile pic</div>
        <div className="user-register-container" id="primary-reg">
          <label className="upload-img-label">Profile Pic:</label>
          <input className="upload-img-input" type="file" name="profilePic" onChange={(e) => setProfilePic(e.target.files[0])}></input>
        </div>
      </>    
    )
  }
}

export default ProfilePic