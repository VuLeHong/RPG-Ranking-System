import  { useEffect, useState } from 'react'
import './Profile.css'
import Header from '../head/Header'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
import Radars from './chart/Radars'
const URL = 'https://human-resource-management-website.onrender.com';
function Profile (){
  
  const avatar = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711411200&semt=ais";
  const auth = localStorage.getItem("user");
  const auth1 = JSON.parse(auth);
  const [owner, setOwner] = useState({});
   useEffect(() => {
    axios.get(`${URL}/user/${auth1.user_id}`) 
    .then(result => {
        setOwner(result.data)
    })
    .catch(err => console.log(err))
  },[])
  const total = owner.stats === undefined ? auth1.stats.organizational_skill + auth1.stats.techical_skill + auth1.stats.idea_contribution + auth1.stats.communication_skill + auth1.stats.product_optimization : owner.stats.organizational_skill + owner.stats.techical_skill + owner.stats.idea_contribution + owner.stats.communication_skill + owner.stats.product_optimization

  return (
    <div className='grid-container'>
      <Header />
      <Sidebar />
      <div className='contain'>
        <div className='profile-container'>
          <div className="profile">
            <div className='avatar'>
              <img src={avatar} height="250" width="250" alt="" />
            </div>
            <div className='details'>
              <div className="left">
                <div className="name">
                  <p>Name : {owner.truename}</p>
                </div>
                <div className="gender">
                  {owner.ismale === true ? <p>Gender : Male</p> : <p>Gender: Female</p>}
                </div>
                <div className="role">
                  <p>Role/Dept : {owner.role}</p>
                </div>
                <div className="user_id">
                  <p>User ID : {owner.user_id}</p>
                </div>
                <div className='process'>
                  <p>Rank : {owner.rank}</p>
                  {
                    owner.rank === 'E'
                    ?
                    <div className="progress-bar">
                      <progress value = {total} max="300"></progress>
                      <p>{total} / 300</p> 
                    </div>
                    :
                    owner.rank === 'D'
                    ?
                    <div className="progress-bar">
                      <progress value = {total} max="100"></progress>
                      <p>{total} / 1000</p> 
                    </div>
                    :
                    owner.rank === 'C'
                    ?
                    <div className="progress-bar">
                      <progress value = {total} max="2000"></progress>
                      <p>{total} / 2000</p> 
                    </div>
                    :
                    owner.rank === 'B'
                    ?
                    <div className="progress-bar">
                      <progress value = {total} max="5000"></progress>
                      <p>{total} / 5000</p> 
                    </div>
                    :
                    owner.rank === 'A'
                    ?
                    <div className="progress-bar">
                      <progress value = {total} max="8000"></progress>
                      <p>{total} / 8000</p> 
                    </div>
                    :
                    <div className="progress-bar">
                      <progress value = {total}></progress>
                      <p>{total} / {total}</p> 
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className='stats'>
              <Radars />
          </div>
          </div>
          
        </div>
          
        </div>
      </div>
    
  )
}

export default Profile