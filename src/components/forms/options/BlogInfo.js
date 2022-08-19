import React from 'react'

const BlogInfo = ({isSelected, profileName, setProfileName, blogTitle, setBlogTitle, profileDesc, setProfileDesc}) => {
  if (isSelected) {
    return (
      <>
        <div className="options-desc">Update your blog page information</div>
        <div className="user-register-container" id="primary-reg">
            <label className="reg-label" htmlFor="profileName">Username: </label>
            <input className="reg-user-input" type="text" value={profileName} name="profileName" onChange={(e) => setProfileName(e.target.value)}></input>
        </div>
        
        <div className="user-register-container">
          <label className="reg-label" htmlFor="blogTitle">Blog Title: </label>
          <input type="text" value={blogTitle} name="blogTitle" onChange={(e) => setBlogTitle(e.target.value)}></input>
        </div>
  
        <div className="profile-desc-container">
            <label className="reg-label" htmlFor="profileDesc">Profile Description: </label>
            <textarea type="text" value={profileDesc} name="profileDesc" onChange={(e) => setProfileDesc(e.target.value)}></textarea>
        </div>
      </>
    )
  }
}

export default BlogInfo