import './layout.css';

import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import Icon from '@mui/material/Icon';

function Layout(props) {

    const navigate = useNavigate();
    const location = useLocation();

    function reFresh() {
        let url = ''
        if (location.pathname.includes('admin')) {
            if (!location.pathname.includes('login')) {
                url = '/admin/home'
            } else {
                url = '/admin/login'
            }
        }
        try {
            navigate(url);
        } catch (e) {
            throw e;
        }
    }

    function Navigation(props) {
        if (location.pathname.includes('admin') && !location.pathname.includes('login')) {
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
            { name: 'Studio Booking', url: '/admin/studioBooking', id: 1 },
            { name: 'Checkout Booking', url: '/admin/studioBooking', id: 2 },
            { name: 'Workshop Booking ', url: '/admin/workshoprecord', id: 3 },
            { name: 'Report', url: '/admin/report', id: 4 },
            { name: 'Equipment Management', url: '/admin/equipmentManagement', id: 5 },
            { name: 'Workshop Management', url: '/admin/workshopManagement', id: 6 },
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
                <h3 className='refresh' onClick={reFresh}>MakerSpace</h3>
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