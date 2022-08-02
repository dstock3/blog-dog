import codeIcon from '../../assets/code.svg'
import githubIcon from '../../assets/github.png'

const Footer = ({theme}) => {
    return (
        <footer className={theme}>
            <div className="attribution">
                BlogDog CMS was created by David Stockdale.
            </div>
            <div className="social-links">
                <a className="social-link" href="https://github.com/dstock3" target="_blank" rel="noopener noreferrer">
                    <img className="github-icon" src={githubIcon} alt="github icon"></img>
                </a>
                <a className="social-link" href="https://davestockdale.io/" target="_blank" rel="noopener noreferrer">
                    <img className="code-icon" src={codeIcon} alt="code icon"></img>
                </a>
            </div>
        </footer>
    );
}

export default Footer;