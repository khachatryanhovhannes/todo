import './App.css';
import { Route, Routes } from 'react-router-dom';
import Todo from './pages/home/Todo';
import NoFound from './pages/noFound/NoFound'
import SingleTask from './pages/singleTask/SingleTask';
import Navbar from './componenets/navBar/NavBar';
import About from './pages/about/About';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from './componenets/Toastify/Toastify';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/signUp/SignUp';




function App() {
  return (
    <div className='App'>
      <Toastify />
      <Navbar />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/task/:id" element={<SingleTask />} />
        <Route path="/about" element={<About />} />
        <Route path='/signIn' element={<SignIn />}/>
        <Route path='/signUp' element={<SignUp />}/>
        <Route path="*" element={<NoFound />} />
      </Routes>
    </div>

  )
}

export default App;
