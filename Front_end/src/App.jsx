import './App.css'
// import LoginForm from './components/Login/Login'
// import Home from './Home'
import Profile from './components/profile/Profile'
import Task from './components/Task/Task'
import Ranking from './components/ranking/Ranking'
import Project from './components/pr0ject/Project'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginForm from './components/Login/Login'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/task' element={<Task/>}/>
          <Route path='/ranking' element={<Ranking />}/>
          <Route path='/project' element={<Project />}/>
        </Routes>
      {/* <Home /> */}
      </BrowserRouter>
    </>
  )
}

export default App