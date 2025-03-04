import './global.scss'

// components
import Header from './components/Header/Header';
import Generator from './components/Generator/Generator';

function App() {

  return (
    <div className='container'>
      <div className="password-generator">
        <Header />
        <Generator />
      </div>
    </div>
  )
}

export default App
