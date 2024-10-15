import {  BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import ReadUsers from './ReadUsers';
import UpdateUser from './UpdateUser';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/readuser/:id' element={<ReadUsers/>} />
        <Route path='/updateuser/:id' element={<UpdateUser/>} />


      </Routes>
      </Router>
    </div>
  );
}

export default App;
