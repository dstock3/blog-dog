import codeIcon from '../../assets/code.svg'
import githubIconBlack from '../../assets/github_black.svg'
import githubIcon from '../../assets/github.svg'
import codeIconBlack from '../../assets/code_black.svg'
import { useEffect, useState } from 'react'

const Footer = ({theme}) => {
    const [codeImg, setCodeImg] = useState(codeIcon)
    const [hubImg, setHubImg] = useState(githubIcon)
    
    useEffect(()=> {
        const whiteSet = ["dark", "forest"]
        const blackSet = ["light", "artic", "azure"]

        for (let i = 0; i < whiteSet.length; i++) {
            if (theme === whiteSet[i]) {
                setCodeImg(codeIcon)
                setHubImg(githubIcon)
            }
        }

        for (let i = 0; i < blackSet.length; i++) {
            if (theme === blackSet[i]) {
                setCodeImg(codeIconBlack)
                setHubImg(githubIconBlack)
            }
        }

    }, [])

    return (
        <footer className={theme}>
            <div className="attribution">
                BlogDog CMS was created by David Stockdale.
            </div>
            <div className="social-links">
                <a className="social-link" href="https://github.com/dstock3" target="_blank" rel="noopener noreferrer">
                    <img className="github-icon" src={hubImg} alt="github icon"></img>
                </a>
                <a className="social-link" href="https://davestockdale.io/" target="_blank" rel="noopener noreferrer">
                    <img className="code-icon" src={codeImg} alt="code icon"></img>
                </a>
            </div>
        </footer>
    );
}

export default Footer;