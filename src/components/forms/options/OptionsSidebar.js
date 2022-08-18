import React from 'react'

const OptionsSidebar = ({toggleOption, theme}) => {
  return (
    <ul className={"options-sidebar " + theme + "-accent"}>
        <li className="options-sidebar-button" onClick={()=>toggleOption("blogInfo")}>Blog Info</li>
        <li className="options-sidebar-button" onClick={()=>toggleOption("profilePic")}>Profile Pic</li>
        <li className="options-sidebar-button" onClick={()=>toggleOption("displaySettings")}>Display Settings</li>
        <li className="options-sidebar-button" onClick={()=>toggleOption("accountInfo")}>Account Info</li>
    </ul>
  )
}

export default OptionsSidebar