import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Button from './components/Button'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Sginin'
import TodoDashboard from './pages/Todo'
import CreateTodo from './pages/createTodo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/signin' element={<Signin />}/>
        <Route path='/todos' element={<TodoDashboard />}/>
        <Route path='/createTodo' element={<CreateTodo />}/>
      </Routes>
    </BrowserRouter>
  )
}



export default App
