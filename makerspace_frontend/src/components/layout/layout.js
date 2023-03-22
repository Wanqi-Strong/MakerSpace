import './layout.css';

import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import Icon from '@mui/material/Icon';

function Layout(props) {

    const navigate = useNavigate();
    const location = useLocation();

    function Navigation(props) {
        if (location.pathname.includes('admin')) {
            return (
                <nav>
                    <div className='dashboard-title'>Dashboard</div>
                    {Menu()}
                </nav>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    function Menu(props) {
        const [menuList] = useState([
            { name: 'Home', url: '/admin/home', id: 0 },
            { name: 'Booking Equipment', url: '/admin/equipmentrecord', id: 1 },
            { name: 'Booking Workshop', url: '/admin/workshoprecord', id: 2 },
            { name: 'Report', url: '/admin/report', id: 3 },
            { name: 'Equipment Management', url: '/admin/equipmentManagement', id: 4 },
            { name: 'Workshop Management', url: '/admin/workshopManagement', id: 5 },
        ]);
        const MenuItems = menuList.map((item) =>
            <MenuItem key={item.id} item={item} />
        );
        return (
            <div>
                {MenuItems}
            </div>
        )
    }
    function MenuItem(props) {
        const item = props.item;
        const location = useLocation();
        function navigateTo() {
            try {
                navigate(item.url);
            } catch (e) {
                throw e;
            }
        }
        return (
            <div className={'flex flex_center_ver flex_space-around ' + (location.pathname === item.url ? 'MenuItem-active' : 'MenuItem')} onClick={navigateTo}>
                <span>{item.name}</span>
                <Icon>app_registration</Icon>
            </div>
        )
    }
    return (
        <div className="container flex flex_ver flex_center_all layout-box">
            <header className='flex flex_center_ver'>
                <h3>MakerSpace</h3>
            </header>
            <main className='flex_1'>
                <div className="flex flex_center_ver">
                    <Navigation></Navigation>
                    <section className="flex_1">{props.children}</section>
                </div>
            </main>
            <footer className='flex flex_center_ver'>
                <h1>CONTACT</h1>
                <h2>Library</h2>
                <p>University of Galway</p>
                <p>University Road,</p>
                <p>Galway, Ireland</p>
                <p>T. +353 91 493399</p>
            </footer>
        </div>
    );
}
export default Layout;