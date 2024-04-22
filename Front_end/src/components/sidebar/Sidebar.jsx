import React from 'react'
import { BsFillPersonFill, BsListTask, BsClipboard2Pulse, BsFillArchiveFill } from 'react-icons/bs'
import logo from '../../assets/logo-white.png'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar({openSidebarToggle}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src={logo} height = "50" width = "180" />
            </div>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href=''>
                    <Link to='/'><BsFillPersonFill className='icon'/> Profile</Link>
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href=''>
                <Link to='/task'><BsListTask className='icon'/> Tasks</Link>

                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <Link to='/ranking'><BsClipboard2Pulse className='icon'/> Ranking</Link>
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">   
                    <Link to='/project'><BsFillArchiveFill className='icon'/> Project</Link>

                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar