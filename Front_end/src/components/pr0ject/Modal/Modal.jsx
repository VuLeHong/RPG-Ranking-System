import  { useState } from "react";
import "./Modal.css";
import axios from 'axios'
import { IoMdClose } from "react-icons/io";
import { TiPlus } from "react-icons/ti";
const URL = 'https://human-resource-management-website.onrender.com';



const Modal = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState();
  const [Desc, setDesc] = useState();
  const auth = localStorage.getItem("user");
  const auth1 = JSON.parse(auth);
  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleAdd = () => {
    axios.post(`${URL}/project/`, {owner_id:auth1._id, name: name, desc: Desc})
    .then( result=> {
      if(result){
        location.reload()
      }
    })
    .catch(err => console.log(err))
}

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        <i className="icon"><TiPlus /></i>
        CREATE PROJECT
        </button>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="title-project">
                <h2>Create Project</h2>
                <button className="close-modal" onClick={toggleModal}>
                <IoMdClose />
                </button>
            </div>
            <form className="form-create" onSubmit={handleAdd}>
                <div className="name-project">
                    <p className="text-label" htmlFor="">Name :</p>
                    <input className="input-modal" type="text" placeholder=" Name of project" onChange={ (e) => setName(e.target.value)} autoFocus required />
                </div>
                <div className="desc-project">
                    <label className="text-label" htmlFor="">Description :</label>
                    <input className="Desc-table" type="text" placeholder=" Desciption..." onChange={ (e) => setDesc(e.target.value)} required />
                </div>
                <div className="create-project">
                    <button className="create-project1" type="submit">Create project</button>
                </div>
            </form>
            
          </div>
        </div>
      )}
    </>
  );
}

export default Modal