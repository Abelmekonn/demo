import { useState } from 'react'
import './App.css'
import AddEmployee from './pages/AddEmployee'
import Home from './pages/Home'
import Login from './pages/Login'
import {Routes,Route} from "react-router"
function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/add-employee' element={<AddEmployee />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </div>
    </>
  );
}

export default App
