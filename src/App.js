import './App.css';
import { Route, Routes } from 'react-router-dom';
import Todo from './pages/home/Todo';
import NoFound from './pages/noFound/NoFound'
import SingleTask from './pages/singleTask/SingleTask';
import Navbar from './componenets/navBar/NavBar';
import About from './pages/about/About';

function App() {

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/task/:id"  element={<SingleTask />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
    </div>
  )
}

export default App;
