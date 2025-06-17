import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Searchpage from './pages/Searchpage';
import Moviepage from './pages/Moviepage';
import { Home } from '@mui/icons-material';

const App = () => {
  return (
    <div>
      <div className="flex items-center p-2 z-20 absolute top-0 w-full justify-end">
        <a href="/" className={"p-2 bg-[#00b4d8] rounded-md mx-10 flex items-center my-2"}>
          <Home fontSize='small'/>
          <span></span>
        </a>
      </div>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/search/:title' element={<Searchpage />}></Route>
          <Route path="/movie/:id" element={<Moviepage />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App