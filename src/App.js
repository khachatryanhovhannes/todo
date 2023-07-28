import './App.css';
import { Route, Routes } from 'react-router-dom';
import Todo from './componenets/pages/home/Todo';
import NoFound from './componenets/pages/noFound/NoFound';
import SingleTask from './componenets/pages/singleTask/SingleTask';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/task/:id"  element={<SingleTask />} />
        {/* <Route path="/about" element={<SingleTask />} /> */}
        <Route path="*" element={<NoFound />} />
      </Routes>
    </div>
  )
}

export default App;
