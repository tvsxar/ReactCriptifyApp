// styles
import './Header.scss';
import '../../theme.scss';

// images
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import github from '../../assets/github.svg';

// types
interface HeaderProps {
    isLight: boolean,
    toggleTheme: () => void
}

function Header({isLight, toggleTheme} : HeaderProps) {
    return (
            <div className="header-description">
                <div className="header-text">
                    <h1 className={`header-title ${isLight ? 'light' : ''}`}>Criptify</h1>
                    <p className="header-slogan">Protect your data, secure your future!</p>
                </div>

                <div className="header-buttons">
                    <button onClick={toggleTheme} className={`theme-btn btn ${isLight ? 'light' : ''}`}><img src={isLight ? moon : sun} alt="sun" /></button>
                    <a href='https://github.com/tvsxar' className={`github-btn btn ${isLight ? 'light' : ''}`}><img src={github} alt="github" /></a>
                </div>
            </div>
    )
}

export default Header;