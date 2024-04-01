import React from 'react';
import './Navbar.css';
import logo_light from '../../assets/Navbar/logo-black.png';
import logo_dark from '../../assets/Navbar/logo-white.png';
import search_icon_light from '../../assets/Navbar/search-w.png';
import search_icon_dark from '../../assets/Navbar/search-b.png';
import toggle_light from '../../assets/Navbar/night.png';
import toggle_dark from '../../assets/Navbar/day.png';



const Navbar = ({ theme, setTheme }) => {

    const toggle_mode = () => {
        theme == 'light' ? setTheme('dark') : setTheme('light');
    }

    return (
        <div className='navbar'>

            <img src={theme == 'light' ? logo_light : logo_dark} alt="" className='logo' />

            <ul>
                <li>Setting</li>
                <li>Logout</li>
                
            </ul>

            <div className='search-box'>
                <input type='text' placeholder='Search' />
                <img src={ theme == 'light' ? search_icon_light : search_icon_dark} alt="" />
            </div>

            <img onClick={() => { toggle_mode() }} src={theme == 'light' ? toggle_light : toggle_dark} alt="" className='toggle-icon' />

        </div>
    )
}

export default Navbar;
