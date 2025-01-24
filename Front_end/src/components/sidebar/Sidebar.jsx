import { useEffect, useState } from 'react'  
import { BsFillPersonFill, BsListTask, BsClipboard2Pulse, BsFillArchiveFill } from 'react-icons/bs'
import logo from "../../assets/images.png";
import { Link } from 'react-router-dom';
import './Sidebar.css';
import axios from 'axios'


const URL = 'https://human-resource-management-website.onrender.com';
function Sidebar() {
    const auth = localStorage.getItem("user");
    const auth1 = JSON.parse(auth);
    const [owner, setOwner] = useState({});
    const notify = () => {
        alert("Your rank is not enough")
    };
    useEffect(() => {
        axios.get(`${URL}/user/${auth1.user_id}`) 
        .then(result => {
             setOwner(result.data)
        })
        .catch(err => console.log(err))
      },[])

  return (
    <aside id="sidebar" className="sidebar-responsive">
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src={logo} />
            </div>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                    <Link className='component-icon-list' to='/profile'><BsFillPersonFill className='icon'/> <p>Profile</p></Link>
            </li>
            <li className='sidebar-list-item'>
                <Link className='component-icon-list' to='/task'><BsListTask className='icon'/> <p>Tasks</p></Link>
            </li>
            <li className='sidebar-list-item'>
                    <Link className='component-icon-list' to='/ranking'><BsClipboard2Pulse className='icon'/> <p>Ranking</p></Link>
            </li>
            <li className='sidebar-list-item'>
                {owner.rank === 'E' || owner.rank === 'D' || owner.rank === 'C' ? (
                    <Link className='component-icon-list notify' onClick={notify}>
                    <BsFillArchiveFill className='icon'/> 
                    <p>Project</p> 
                    </Link>
                ) : (
                    <Link className='component-icon-list' to='/project'>
                    <BsFillArchiveFill className='icon'/> 
                    <p>Project</p> 
                    </Link>
                )}
            </li>
        </ul>
    </aside>
  )
}


export default Sidebar
