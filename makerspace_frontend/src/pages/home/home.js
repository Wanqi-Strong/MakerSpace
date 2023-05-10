import React from "react"
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

import './home.css';
function Home(props) {

    const navigate = useNavigate();

    function navigateTo(e) {
        try {
            navigate(e.target.id);
        } catch (e) {
            throw e;
        }
    }
    return (
        <div className="container flex flex_center_all flex_space-around box">
            <Button variant="outlined" onClick={navigateTo} id='/student/home'>For Student</Button>
            <Button variant="outlined" onClick={navigateTo} id='/admin/login'>For Admin</Button>
        </div>
    )
}
export default Home;
