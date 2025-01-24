import { Link } from 'react-router-dom'
import './Header.css'

const logout = ()=>{
  localStorage.clear();
}

function Header() {
  return (
    <header className='header'>
        <div className='header-right'>
          <Link to='/' className='logout' onClick={logout}>Logout</Link>
        </div>
    </header>
  )
}

export default Header