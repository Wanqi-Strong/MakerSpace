import { BrowserRouter, Routes, Route } from 'react-router-dom';
// page
import Login from './pages/admin/login/login';
import Home from './pages/admin/home/home';
import NoPage from './components/noPage/noPage';
import Layout from './components/layout/layout';
// public css
import './App.css';
import './style/flex.css'

function App() {
  return (
    <Layout>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </Layout>
  );
}

export default App;
