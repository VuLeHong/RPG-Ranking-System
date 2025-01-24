import { useEffect, useState } from 'react'  
import { BsFillPersonFill, BsListTask, BsClipboard2Pulse, BsFillArchiveFill } from 'react-icons/bs'
import logo from "../../assets/images.png";
import { Link } from 'react-router-dom';
import './Sidebar.css';
import axios from 'axios'
import PropTypes from 'prop-types';


const URL = 'https://human-resource-management-website.onrender.com';
function Sidebar({openSidebarToggle}) {
    const auth = localStorage.getItem("user");
    const auth1 = JSON.parse(auth);
    const [owner, setOwner] = useState({});
    const notify = () => {
        alert("Your rank is not enough")
    };
    useEffect(() => {
        axios.get(`${URL}/user/${auth1.user_id}`) 
        .then(result => {
             setOwner(result)
        })
        .catch(err => console.log(err))
      },[])

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src={logo} />
            </div>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href=''>
                    <Link className='component-icon-list' to='/profile'><BsFillPersonFill className='icon'/> <p>Profile</p></Link>
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href=''>
                <Link className='component-icon-list' to='/task'><BsListTask className='icon'/> <p>Tasks</p></Link>

                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <Link className='component-icon-list' to='/ranking'><BsClipboard2Pulse className='icon'/> <p>Ranking</p></Link>
                </a>
            </li>
            <li className='sidebar-list-item'>
                    {owner.rank === 'E'
                    ?
                    <a href="" className='notify' onClick={notify}>
                        <Link className='component-icon-list'><BsFillArchiveFill className='icon'/> <p>Project</p> </Link>
                    </a>
                    :
                    owner.rank === 'D'
                    ?
                    <a href="" className='notify' onClick={notify}>
                        <Link className='component-icon-list'><BsFillArchiveFill className='icon'/> <p>Project</p> </Link>
                    </a>
                    :
                    owner.rank === 'C'
                    ?
                    <a href="" className='notify' onClick={notify}>
                        <Link className='component-icon-list'><BsFillArchiveFill className='icon'/> <p>Project</p> </Link>
                    </a>
                    :
                        <a href="">
                            <Link className='component-icon-list' to='/project'><BsFillArchiveFill className='icon'/> <p>Project</p> </Link>
                        </a>
                    }
            </li>
        </ul>
    </aside>
  )
}
Sidebar.propTypes = {
    openSidebarToggle: PropTypes.bool.isRequired,
};

export default Sidebar
