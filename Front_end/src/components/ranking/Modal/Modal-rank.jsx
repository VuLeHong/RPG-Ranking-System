import {  useState, useEffect } from 'react';
import "./Modal-rank.css";
import Radar_rank from "./chart/Radar-rank";
import axios from "axios";

const URL = 'https://human-resource-management-website.onrender.com';
const Modal_rank = (data) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const compa = () => {
    alert("You're comparing yourself");
  };
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
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={owner.user_id===data._id ? compa :toggleModal} className="btn-click">
        View Details
        </button>
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <div className="title-project">
                <h2>Vs You</h2>
            </div>
            <div className="radar">
              <Radar_rank organizational_skill= {data.organizational_skill}  techical_skill= {data.techical_skill} idea_contribution= {data.idea_contribution} communication_skill= {data.communication_skill} product_optimization= {data.product_optimization}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal_rank