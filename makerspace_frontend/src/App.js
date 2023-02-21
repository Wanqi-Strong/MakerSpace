import { BrowserRouter, Routes, Route } from 'react-router-dom';
// page
import Login from './pages/admin/login/login';
import Home from './pages/admin/home/home';
import EquipmentManagement from './pages/admin/equipmentManagement/equipmentManagement';
import NoPage from './components/noPage/noPage';
import Layout from './components/layout/layout';
// public css
import './App.css';
import './style/flex.css'

function App() {
  return (
      <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/equipmentManagement" element={<EquipmentManagement />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="*" element={<NoPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
