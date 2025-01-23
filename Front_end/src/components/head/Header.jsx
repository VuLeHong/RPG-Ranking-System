import { Link } from 'react-router-dom'
import './Header.css'

const logout = ()=>{
  localStorage.clear();
}

function Header() {
  return (
    <header className='header'>
        <div className='header-right'>
            
              <button className='logout'>
              <Link to='/'><a onClick={logout}>Logout</a></Link>
              </button>
            
        </div>
    </header>
  )
}

export default Header