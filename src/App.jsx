import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login.jsx"
import Main from "./pages/Main.jsx"
import MainAdmin from './pages/Admin/MainAdmin.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mainAdmin" element={<MainAdmin />} />
      </Routes>
      <ToastContainer />

    </Router>
    </>
    
  )
}

export default App
