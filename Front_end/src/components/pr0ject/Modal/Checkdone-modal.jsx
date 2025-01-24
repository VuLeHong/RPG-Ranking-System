
import  { useState } from 'react' 
import "./Checkdone-modal.css";
import axios from 'axios'
const URL = 'https://human-resource-management-website.onrender.com';
const Checkdone_modal = (data) => {
  const [modal, setModal] = useState(false);
  const [Organization, setOrganization] = useState();
  const [Technology, setTechnology] = useState();
  const [Idea, setIdea] = useState();
  const [Communication, setCommunication] = useState();
  const [Product, setProduct] = useState();
  const toggleModal = () => {
    setModal(!modal);
  };


  const wrong_submit = () => {
    alert("You input wrong points")
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

//   const [owner, setOwner] = useState({});
//   useEffect(() => {
//    axios.get(`${URL}/user/${data.user_id}`) 
//    .then(result => {
//         setOwner(result.data)
//    })
//    .catch(err => console.log(err))
//  },[])

  const handleAdd = () => {
    alert("You submit successfully")
      axios.post(`${URL}/upscore/${data.user_id}`, {
        organizational_up: Organization, 
        techical_up: Technology,
        idea_up: Idea,
        communication_up: Communication,
        product_up: Product,
        // organizational_skill: owner.stats.organizational_skill,
        // techical_skill: owner.stats.techical_skill,
        // idea_contribution: owner.stats.idea_contribution,
        // communication_skill: owner.stats.communication_skill,
        // product_optimization: owner.stats.product_optimization
      })
      .then(result=> {
        if(result){
          location.reload()
        }
      })
      .catch(err => console.log(err))

      axios.post(`${URL}/updone/${data.task_id}`)
       .then(result=> {
         if(result){
           location.reload()
         }
       })
       .catch(err => console.log(err))
  }
  const total = parseInt(Organization) + parseInt(Technology) + parseInt(Idea) + parseInt(Communication) + parseInt(Product);

  return (
    <>
      <button onClick={toggleModal} className="btn-modalcheck">
        Check Done
      </button>
      {modal && (
        <div className="modalcheck">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="check-content">
            <div className="title-check">
                <h2>Check Done</h2>
            </div>
            <div className="content-task-project">
                <h3>Content of the task: {data.content}</h3>
                <h3>By: {data.user_id}</h3>
                <h3>Rank of the task: {data.rank}</h3>
                {
                data.rank === 'F' ? <h3>Score: 5</h3> :
                data.rank === 'E' ? <h3>Score: 15</h3> :
                data.rank === 'D' ? <h3>Score: 25</h3> :
                data.rank === 'C' ? <h3>Score: 35</h3> :
                data.rank === 'B' ? <h3>Score: 55</h3> :
                data.rank === 'A' ? <h3>Score: 70</h3> :
                data.rank === 'S' ? <h3>Score: 80</h3> :
                <></>
                }
            </div>
            <form>
                <div className="content-plus-points">
                    <h3>Which skills do you want to add?</h3>
                </div>
                <div className="plusploint-form">
                    <div className="plus">
                        <label htmlFor="">Organization skill:</label>
                        {
                        data.rank === 'F' ? <input type="number" min="0" max="5" onChange={ (e) => setOrganization(e.target.value)} required autoFocus/> :
                        data.rank === 'E' ? <input type="number" min="0" max="15" onChange={ (e) => setOrganization(e.target.value)} required autoFocus/> :
                        data.rank === 'D' ? <input type="number" min="0" max="25" onChange={ (e) => setOrganization(e.target.value)} required autoFocus/> :
                        data.rank === 'C' ? <input type="number" min="0" max="35" onChange={ (e) => setOrganization(e.target.value)} required autoFocus/> :
                        data.rank === 'B' ? <input type="number" min="0" max="55" onChange={ (e) => setOrganization(e.target.value)} required autoFocus/> :
                        data.rank === 'A' ? <input type="number" min="0" max="70" onChange={ (e) => setOrganization(e.target.value)} required autoFocus/> :
                        data.rank === 'S' ? <input type="number" min="0" max="80" onChange={ (e) => setOrganization(e.target.value)} required autoFocus/> :
                        <></>
                        }
                    </div>
                    <div className="plus">
                        <label htmlFor="">Technology skill:</label>
                        {
                        data.rank === 'F' ? <input type="number" min="0" max="5" onChange={ (e) => setTechnology(e.target.value)} required /> :
                        data.rank === 'E' ? <input type="number" min="0" max="15" onChange={ (e) => setTechnology(e.target.value)} required /> :
                        data.rank === 'D' ? <input type="number" min="0" max="25" onChange={ (e) => setTechnology(e.target.value)} required /> :
                        data.rank === 'C' ? <input type="number" min="0" max="35" onChange={ (e) => setTechnology(e.target.value)} required /> :
                        data.rank === 'B' ? <input type="number" min="0" max="55" onChange={ (e) => setTechnology(e.target.value)} required /> :
                        data.rank === 'A' ? <input type="number" min="0" max="70" onChange={ (e) => setTechnology(e.target.value)} required /> :
                        data.rank === 'S' ? <input type="number" min="0" max="80" onChange={ (e) => setTechnology(e.target.value)} required /> :
                        <></>
                        }
                    </div>
                    <div className="plus">
                        <label htmlFor="">Idea contribution:</label>
                        {
                        data.rank === 'F' ? <input type="number" min="0" max="5" onChange={ (e) => setIdea(e.target.value)} required /> :
                        data.rank === 'E' ? <input type="number" min="0" max="15" onChange={ (e) => setIdea(e.target.value)} required /> :
                        data.rank === 'D' ? <input type="number" min="0" max="25" onChange={ (e) => setIdea(e.target.value)} required /> :
                        data.rank === 'C' ? <input type="number" min="0" max="35" onChange={ (e) => setIdea(e.target.value)} required /> :
                        data.rank === 'B' ? <input type="number" min="0" max="55" onChange={ (e) => setIdea(e.target.value)} required /> :
                        data.rank === 'A' ? <input type="number" min="0" max="70" onChange={ (e) => setIdea(e.target.value)} required /> :
                        data.rank === 'S' ? <input type="number" min="0" max="80" onChange={ (e) => setIdea(e.target.value)} required /> :
                        <></>
                        }
                    </div>
                    <div className="plus">
                        <label htmlFor="">Communication skill:</label>
                        {
                        data.rank === 'F' ? <input type="number" min="0" max="5" onChange={ (e) => setCommunication(e.target.value)} required /> :
                        data.rank === 'E' ? <input type="number" min="0" max="15" onChange={ (e) => setCommunication(e.target.value)} required /> :
                        data.rank === 'D' ? <input type="number" min="0" max="25" onChange={ (e) => setCommunication(e.target.value)} required /> :
                        data.rank === 'C' ? <input type="number" min="0" max="35" onChange={ (e) => setCommunication(e.target.value)} required /> :
                        data.rank === 'B' ? <input type="number" min="0" max="55" onChange={ (e) => setCommunication(e.target.value)} required /> :
                        data.rank === 'A' ? <input type="number" min="0" max="70" onChange={ (e) => setCommunication(e.target.value)} required /> :
                        data.rank === 'S' ? <input type="number" min="0" max="80" onChange={ (e) => setCommunication(e.target.value)} required /> :
                        <></>
                        }
                    </div>
                    <div className="plus">
                        <label htmlFor="">Product optimization:</label>
                        {
                        data.rank === 'F' ? <input type="number" min="0" max="5" onChange={ (e) => setProduct(e.target.value)} required /> :
                        data.rank === 'E' ? <input type="number" min="0" max="15" onChange={ (e) => setProduct(e.target.value)} required /> :
                        data.rank === 'D' ? <input type="number" min="0" max="25" onChange={ (e) => setProduct(e.target.value)} required /> :
                        data.rank === 'C' ? <input type="number" min="0" max="35" onChange={ (e) => setProduct(e.target.value)} required /> :
                        data.rank === 'B' ? <input type="number" min="0" max="55" onChange={ (e) => setProduct(e.target.value)} required /> :
                        data.rank === 'A' ? <input type="number" min="0" max="70" onChange={ (e) => setProduct(e.target.value)} required /> :
                        data.rank === 'S' ? <input type="number" min="0" max="80" onChange={ (e) => setProduct(e.target.value)} required /> :
                        <></>
                        }
                    </div>
                </div>
            <div className="create-project">
                {
                data.rank === 'F' 
                ? 
                total === 5 
                  ? 
                  <button className="create-project2" type="submit" onClick={handleAdd}>Submit</button>
                  :
                  <button className="create-project2" onClick={wrong_submit}>Submit</button>
                :
                data.rank === 'E' 
                ? 
                total === 15 
                  ? 
                  <button className="create-project2" type="submit" onClick={handleAdd}>Submit</button>
                  :
                  <button className="create-project2" onClick={wrong_submit}>Submit</button>
                :
                data.rank === 'D' 
                ? 
                total === 25 
                  ? 
                  <button className="create-project2" type="submit" onClick={handleAdd}>Submit</button>
                  :
                  <button className="create-project2" onClick={wrong_submit}>Submit</button>
                :
                data.rank === 'C' 
                ? 
                total === 35 
                  ? 
                  <button className="create-project2" type="submit" onClick={handleAdd}>Submit</button>
                  :
                  <button className="create-project2" onClick={wrong_submit}>Submit</button>
                :
                data.rank === 'B' 
                ? 
                total === 55 
                  ? 
                  <button className="create-project2" type="submit" onClick={handleAdd}>Submit</button>
                  :
                  <button className="create-project2" onClick={wrong_submit}>Submit</button>
                :
                data.rank === 'A' 
                ? 
                total === 70 
                  ? 
                  <button className="create-project2" type="submit" onClick={handleAdd}>Submit</button>
                  :
                  <button className="create-project2" onClick={wrong_submit}>Submit</button>
                :
                data.rank === 'S' 
                ? 
                total === 80
                  ? 
                  <button className="create-project2" type="submit" onClick={handleAdd}>Submit</button>
                  :
                  <button className="create-project2" onClick={wrong_submit}>Submit</button>
                :
                <></>
                }
            </div>
          </form>

          </div>
        </div>
      )}
    </>
  );
}

export default Checkdone_modal
