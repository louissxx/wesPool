import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import {CookiesProvider} from 'react-cookie'
import SearchResults from './components/SearchResults';
import RideInfo from './components/RideInfo';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Profile from './components/Profile';
import MyRides from './components/MyRides';
import Register from './components/Register';
import Logout from './components/Logout';
import PickRoute from './components/PickRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Header/>
          <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/search/:srcID' element={<SearchResults/>}/>
            <Route path='/search/:srcID/:dstID' element={<SearchResults/>}/>
            <Route path='/search/:srcID/:dstID/:dateID' element={<SearchResults/>}/>
            <Route path='/info/:id' element={<RideInfo/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/myrides' element={<MyRides/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/logout' element={<Logout/>}></Route>
            <Route path='/maps/:form' element={<PickRoute/>}></Route>
          </Routes>
        <NavBar/>
      </React.StrictMode>
    </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
