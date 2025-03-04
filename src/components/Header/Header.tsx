import './Header.scss';

// images
import sun from '../../assets/sun.svg';
import github from '../../assets/github.svg';

function Header() {
    return (
            <div className="header-description">
                <div className="header-text">
                    <h1 className="header-title">Criptify</h1>
                    <p className="header-slogan">Protect your data, secure your future!</p>
                </div>

                <div className="header-buttons">
                    <button className="theme-btn btn"><img src={sun} alt="sun" /></button>
                    <a href='https://github.com/tvsxar' className="github-btn btn"><img src={github} alt="github" /></a>
                </div>
            </div>
    )
}

export default Header;