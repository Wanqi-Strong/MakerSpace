import { BrowserRouter, Routes, Route } from 'react-router-dom';

// public pages
import NoPage from './components/noPage/noPage';
import Layout from './components/layout/layout';
import Home from './pages/home/home';

// admin pages
import Login from './pages/admin/login/login';
import AdminHome from './pages/admin/home/home';
import EquipmentManagement from './pages/admin/equipmentManagement/equipmentManagement';
import StudioBooking from './pages/admin/studioBooking/studioBooking'
import CheckoutBooking from './pages/admin/checkoutBooking/checkoutBooking'

// student pages
import StudentHome from './pages/student/HomePage/StudentHome';
import EquipmentApply from './pages/student/EquipmentApply/EquipmentApply'
import EquipmentCheckout from './pages/student/EquipmentCheckout/EquipmentCheckout'

// public css
import './App.css';
import './style/flex.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Login />} exact /> */}
          <Route path="/" element={<Home />} exact />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/equipmentManagement" element={<EquipmentManagement />} />
          <Route path="/admin/studioBooking" element={<StudioBooking />} />
          <Route path="/admin/checkoutBooking" element={<CheckoutBooking />} />
          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/student/equipmentApply" element={<EquipmentApply />} />
          <Route path="/student/EquipmentCheckout" element={<EquipmentCheckout />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
