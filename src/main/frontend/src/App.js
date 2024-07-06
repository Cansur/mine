/* eslint-disable */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import Main from './Component/Main';
import Announcement from './Component/Board/Announcement';
import BoardList from './Component/Board/BoardList';
import Board from './Component/Board/Board';
import BoardUpdate from './Component/Board/BoardUpdate';
import BoardView from './Component/Board/BoardView'
import "./index.css"
import SideBar from './Component/SideBar';
import Footer from './Component/Footer';
// import NotFound from ''

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <div style={{ backgroundColor: 'black', color: 'white' }}>
          <div className='container-sm padding-top-50'>
            <SideBar/>
            <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="/board" element={<Board/>} />
              <Route path="/boardupdate" element={<BoardUpdate/>} />
              <Route path="/boardview" element={<BoardView/>} />
              <Route path="/boardList" element={<BoardList />} />
              <Route path="/announcement" element={<Announcement />} />
            </Routes>
          </div>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
