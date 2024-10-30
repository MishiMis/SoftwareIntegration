import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login.jsx"
// import Main from "./pages/Main.jsx"
// import MainAdmin from './pages/Admin/MainAdmin.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routesprotec from './routers/routesprotec.jsx';
import { Dasboard } from './Components/dashboard/Dasboard.jsx';
import Actividades from './Components/actividades/Actividades.jsx';
import Configuraciones from './Components/configuraciones/Configuraciones.jsx';
import Equipo from './Components/equipo/Equipo.jsx';
import { Reportes } from './Components/reportes/Reportes.jsx';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route  element={ <Routesprotec />} >

          <Route path="/dashboard" element={ <Dasboard /> } />
          <Route path="/actividades" element={ < Actividades />} />
          <Route path="/equipo" element={ < Equipo />} />
          <Route path="/reportes" element={ < Reportes />} />
          <Route path="/configuraciones" element={ < Configuraciones />} />
          <Route path="/salir" element={ < salir />} />
          {/* <Route path="/mainAdmin" element={ < Salir />} /> */}
        </Route>

      </Routes>
      <ToastContainer />

    </Router>
    </>
    
  )
}

export default App
