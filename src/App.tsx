import './global.scss'

// hooks
import {useState} from 'react';

// components
import Header from './components/Header/Header';
import Generator from './components/Generator/Generator';

function App() {
  const [isLight, setIsLight] = useState<boolean>(false);

    function toggleTheme() {
        setIsLight(prev => {
            document.body.classList.toggle('light', !prev);
            return !prev;
        });
    }

  return (
    <div className='container'>
      <div className="password-generator">
        <Header isLight={isLight} toggleTheme={toggleTheme} />
        <Generator isLight={isLight} />
      </div>
    </div>
  )
}

export default App
