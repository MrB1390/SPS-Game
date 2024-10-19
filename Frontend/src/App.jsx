import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import GamePage from './Components/GamePage';
import PointsTable from './Components/PointsTable';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className='cointainer-fluid'>
          <nav className='navbar bg-dark border-bottom border-body" data-bs-theme="dark" justify-content-center'>
          <span className='navbar-brand mb-0 h1' style={{color:"white"}} >SPS Game</span>
          <div className="ml-auto">
            <Link to="/" className='btn btn-primary mx-2'>
            Game
            </Link>
            <Link to="/points-table" className='btn btn-primary mx-2' style={{textDecoration:'none'}}>
            Points Table
            </Link>
          </div>
          </nav>
         <Routes>
          <Route path='/' element={<GamePage />} />
          <Route path='/points-table' element={<PointsTable />} />
         </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;