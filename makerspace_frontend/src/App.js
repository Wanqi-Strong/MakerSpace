import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/admin/login/login';
import NoPage from './components/noPage/noPage';

import './App.css';
import './style/flex.css'
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
