import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../Redux/Store';
import { loadUsers } from '../Features/Users/usersSlice';
import SideBar from '../Components/MainPage/MainPage';
import NavBar from '../Components/NavBar/NavBar';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<SideBar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
