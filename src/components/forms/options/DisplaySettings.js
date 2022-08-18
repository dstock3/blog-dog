import React, { useState, useEffect } from 'react'
import themeIcon from '../../../assets/drop.svg'
import themeIconBlack from '../../../assets/drop_black.svg'
import basicIcon from '../../../assets/basic.svg'
import basicIconBlack from '../../../assets/basic_black.svg'
import cardIcon from '../../../assets/card.svg'
import cardIconBlack from '../../../assets/card_black.svg'

const DisplaySettings = ({isSelected, theme, setThemePref, setLayoutPref}) => {
    const [themeClass, setThemeClass] = useState("theme-hidden")
    const [dropClass, setDropClass] = useState("compact")
    const [hoverClassOne, setHoverClassOne] = useState("")
    const [hoverClassTwo, setHoverClassTwo] = useState("")
    const [hoverClassThree, setHoverClassThree] = useState("")
    const [hoverClassFour, setHoverClassFour] = useState("")
    const [hoverClassFive, setHoverClassFive] = useState("")
    const [basicImg, setBasicImg] = useState(basicIcon)
    const [cardImg, setCardImg] = useState(cardIcon)
    const [layoutIsHidden, setLayoutIsHidden] = useState(true)
    const [layoutClass, setLayoutClass] = useState("")
    const [hoverClassSix, setHoverClassSix] = useState("")
    const [hoverClassSeven, setHoverClassSeven] = useState("")
    const [isHidden, setIsHidden] = useState(true)
    const [themeDrop, setThemeDrop] = useState(themeIcon)

    useEffect(()=> {
        const whiteSet = ["dark", "forest"]
        const blackSet = ["light", "artic", "azure"]

        for (let i = 0; i < whiteSet.length; i++) {
            if (theme === whiteSet[i]) {
                setThemeDrop(themeIcon)
                setBasicImg(basicImg)
                setCardImg(cardImg)
            }
        }

        for (let i = 0; i < blackSet.length; i++) {
            if (theme === blackSet[i]) {
                setThemeDrop(themeIconBlack)
                setBasicImg(basicIconBlack)
                setCardImg(cardIconBlack)
            }
        }
    }, [])

    useEffect(()=>{
        if (isHidden) {
            setThemeClass("option-hidden")
            setDropClass("compact")
        } else {
            setThemeClass("")
            setDropClass("")     
        }
    }, [isHidden])

    useEffect(()=> {
        if (layoutIsHidden) {
            setLayoutClass("option-hidden")

        } else {
            setLayoutClass("")
        }
    }, [layoutIsHidden])

    const selectTheme = (pref, elementIndex) => {
        setThemePref(pref)
        let themeOptionElements = document.getElementsByClassName("theme-option-container")
        let optionElements = Array.from(themeOptionElements);
        
        for (let i = 0; i < optionElements.length; i++) {
            if (i === elementIndex) {
                optionElements[i].id = theme + "-selected"
            } else {
                optionElements[i].removeAttribute('id');
            }
        }
    }

    const selectLayout = (pref, elementIndex) => {
        setLayoutPref(pref)
        let layoutOptionElements = document.getElementsByClassName("layout-option")
        let optionElements = Array.from(layoutOptionElements);
        for (let i = 0; i < optionElements.length; i++) {
            if (i === elementIndex) {
                optionElements[i].id = theme + "-selected"
            } else {
                optionElements[i].removeAttribute('id');
            }
        }
    }

    if (isSelected) {
        return (
            <div className="display-settings">
                <div className="customize-page-desc">Choose how your page will be presented to other users.</div>
                <div className="user-register-dropdowns">
                    <div className={"theme-dropdown " + theme + "-accent " + dropClass}>
                        <div className="theme-head-container" onClick={()=>setIsHidden(!isHidden)}>
                            <div className="theme-head">Theme Options</div>
                            <img className="theme-drop-indicator" alt="theme dropdown indicator" src={themeDrop}></img>
                        </div>
                        <div className={"theme-options " + theme + " " + themeClass}>
                            <div className={"theme-option-container " + themeClass + " " + hoverClassOne} onMouseEnter={()=>{setHoverClassOne(theme + "-accent")}} onMouseLeave={()=>{setHoverClassOne("")}} onClick={()=>selectTheme("light", 0)}>
                                <div className="theme-square" id="light-option"></div>
                                <div className="theme-option">Light</div>
                            </div>
                            <div className={"theme-option-container " + themeClass + " " + hoverClassTwo} onMouseEnter={()=>{setHoverClassTwo(theme + "-accent")}} onMouseLeave={()=>{setHoverClassTwo("")}} onClick={()=>selectTheme("dark", 1)}>
                                <div className="theme-square" id="dark-option"></div>
                                <div className="theme-option">Dark</div>
                            </div>
                            <div className={"theme-option-container " + themeClass + " " + hoverClassThree} onMouseEnter={()=>{setHoverClassThree(theme + "-accent")}} onMouseLeave={()=>{setHoverClassThree("")}} onClick={()=>selectTheme("artic", 2)}>
                                <div className="theme-square" id="artic-option"></div>
                                <div className="theme-option">Artic</div>
                            </div>
                            <div className={"theme-option-container " + themeClass + " " + hoverClassFour} onMouseEnter={()=>{setHoverClassFour(theme + "-accent")}} onMouseLeave={()=>{setHoverClassFour("")}} onClick={()=>selectTheme("forest", 3)}>
                                <div className="theme-square" id="forest-option"></div>
                                <div className="theme-option">Forest</div>
                            </div>
                            <div className={"theme-option-container " + themeClass + " " + hoverClassFive} onMouseEnter={()=>{setHoverClassFive(theme + "-accent")}} onMouseLeave={()=>{setHoverClassFive("")}} onClick={()=>selectTheme("azure", 4)}>
                                <div className="theme-square" id="azure-option"></div>
                                <div className="theme-option">Azure</div>
                            </div>
                        </div>
                    </div>
                    <div className={"layout-selection " + theme + "-accent"}>
                        <div className={"layout-prompt-container"} onClick={()=>setLayoutIsHidden(!layoutIsHidden)}>
                            <div className="layout-prompt">Page Layout</div>
                            <img className="layout-drop-indicator" alt="layout dropdown indicator" src={themeDrop}></img>
                        </div>
                        <div className={"layout-options " + theme + "-accent " + layoutClass}>
                            <div className={"layout-option basic-layout " + hoverClassSix} onClick={() => selectLayout("basic", 0)} onMouseEnter={()=>{setHoverClassSix(theme)}} onMouseLeave={()=>{setHoverClassSix("")}}>
                                <img src={basicImg} alt="basic layout icon"></img>
                                <div className="layout-label">Basic</div>
                            </div>
                            <div className={"layout-option basic-layout " + hoverClassSeven} onClick={() => selectLayout("card", 1)} onMouseEnter={()=>{setHoverClassSeven(theme)}} onMouseLeave={()=>{setHoverClassSeven("")}}>
                                <img src={cardImg} alt="card layout icon"></img>
                                <div className="layout-label">Card</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplaySettings