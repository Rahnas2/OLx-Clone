
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SingUp from './pages/SingUp'
import Sell from './pages/Sell'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/authContext'

import ProtectedRoute from './secure/ProtectedRoute'

function App() {

  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sell' element={<ProtectedRoute><Sell /></ ProtectedRoute> } />
          <Route path='/*' element={<Navigate to="/"/>}/>
        </ Routes>
        <ToastContainer />
      </AuthContextProvider>
    </>
  )
}

export default App
