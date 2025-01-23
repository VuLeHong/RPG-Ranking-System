import './Ranking.css'
import axios from "axios";
import { useState, useEffect } from 'react';
import Header from '../head/Header'
import Sidebar from '../sidebar/Sidebar'
import Modal_rank from './Modal/Modal-rank';


const URL = 'https://human-resource-management-website.onrender.com';
const Ranking = () => {


  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const response = await axios.get(`${URL}/user/`);
      setUsers(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [owner, setOwner] = useState({});
  useEffect(() => {
   axios.get(`${URL}/user/${auth1._id}`) 
   .then(result => {
           setOwner(result)
   })
   .catch(err => console.log(err))
 },[])
  const statsMap = users.map(employee => ({
    "organizational_skill": employee.stats.organizational_skill, 
    "techical_skill": employee.stats.techical_skill,
    "idea_contribution": employee.stats.idea_contribution,
    "communication_skill": employee.stats.communication_skill,
    "product_optimization": employee.stats.product_optimization
  }))
  
  const sumArr = []
  statsMap.forEach(obj => {
    let objSum = 0
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        objSum += obj[key]
      }
    }
    sumArr.push(objSum)
  })
  
   let rankedArr = users.map((arr, index) => ({
     ...arr,
     rank: index + 1
   }))

  for (let i = 0; i < sumArr.length; i++) {
    users[i].score = (users[i].score || 0) + sumArr[i]
  }
  users.sort((a, b) => b.score - a.score)
  const auth = localStorage.getItem("user");
  const auth1 = JSON.parse(auth);
  const avatar = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711411200&semt=ais";

  return (
    <div className='grid-container'>  
      <Header />
      <Sidebar />
      <div className='ranking'>
        <div className="RankTitle">
          <h1>Hello {owner.truename}, here is your total stats!</h1>
        </div>
        {rankedArr.map(user =>(
          user._id == owner._id 
          ?
          <div className="rank" key={user._id}>
            <div className="rank-number">
              <h1>{user.rank}</h1>
            </div>
            <div className="profile-comp">
              <div className="avatar">
                <img src={avatar} alt="" width='70' height='70' />
              </div>
              <div className="name">
                <p>{owner.truename}</p>
              </div>
            </div>
          <div className="total">
            <h3>{owner.stats === undefined ? auth1.stats.organizational_skill + auth1.stats.techical_skill + auth1.stats.idea_contribution + auth1.stats.communication_skill + auth1.stats.product_optimization: owner.stats.organizational_skill + owner.stats.techical_skill + owner.stats.idea_contribution + owner.stats.communication_skill + owner.stats.product_optimization}</h3>
          </div>
        </div>
        : 
        <></>
        ))}
        <div className='leaderboard'>
          <div className="subTitle">
            <h1>Leaderboard</h1>
          </div>
          {rankedArr.map(user =>(

          <div className="leader" key={user._id}>
            <div className="rank-no">
              <h1>{user.rank}</h1>
            </div>
            <div className="avt-and-name">
              <div className="avt">
                <img src={avatar} width='70' height='70' />
              </div>
              <div className="profile-name">
                <p>{user.truename}</p>
              </div>
            </div>
            <div className="role">
              <p>{user.role}</p>
            </div>
            <div className="score">
              <h3>{user.stats.organizational_skill + user.stats.techical_skill + user.stats.idea_contribution + user.stats.communication_skill + user.stats.product_optimization}</h3>
            </div>
            <div className="view-employee">
              <Modal_rank _id= {user._id} organizational_skill= {user.stats.organizational_skill}  techical_skill= {user.stats.techical_skill} idea_contribution= {user.stats.idea_contribution} communication_skill= {user.stats.communication_skill} product_optimization= {user.stats.product_optimization}/>
            </div>
          </div>
          ))
        }
        </div>
      </div>
    </div>

  )
}

export default Ranking;