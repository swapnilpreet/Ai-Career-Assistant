
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import ChatWithPDF from './pages/ChatWithPDF'

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='resume-analyzer' element={<ResumeAnalyzer/>}/>
        <Route path='/chatwithpdf' element={<ChatWithPDF/>}/>
    </Routes>
  )
}

export default App
