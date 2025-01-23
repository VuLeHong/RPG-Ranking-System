import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import './Login.css';
const URL = 'https://human-resource-management-website.onrender.com';
const LoginForm = () => {
  const history = useNavigate();
  const [user_id, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e){
    e.preventDefault();
    try {
      await axios.post(`${URL}/user/login`,{
        user_id,password
      })
      .then(res => {
        if(res.status===200){
          localStorage.setItem("user", JSON.stringify(res))
          history("/profile")
        }
        else if(res.status==401){
          alert("Wrong password");
        }
        else if(res.status===404){
          alert("Not exist");
        }
      })
      .catch(e=>{
        alert("wrong details")
        console.log(e);
      })
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div className='wrapper'>
      <div className="login-form">
        <form className="login" onSubmit={submit}>
          <p className='login-title'>Login</p>
          <div className="input-box">
            <input type='text' onChange={(e) => {setUsername(e.target.value) } } placeholder='User ID' required />
          </div>
          <div className="input-box">
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Passwork' required />
          </div>
          <div className='submit-btn'>
          <button type='submit' className='btn'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm