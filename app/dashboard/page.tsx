"use client";
import styles from "./dashboard.module.css";
import { SetStateAction, useState } from 'react';
import "@fontsource/poppins"; 
import logo from "../../assets/Router.png";
import dash from "../../assets/dash.png";
import network from "../../assets/network.png";
import control from "../../assets/control.png";
import avatar from "../../assets/avatar.png";
import Image from 'next/image'; 
import Charts from "../../components/dashboard/dashboardDetails";
import NetworkTopology from "../../components/NetworkTopology/NetworkTopology";
import ControlPanel from "../../components/control/ControlPanel";

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    const handleItemClick = (item: SetStateAction<string>) => {
        setActiveItem(item);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('authToken'); // Replace 'token' with the actual key you use
            window.location.href = 'http://localhost:3000/'; // Redirect to the home page
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.DashContainer}>
                <div className={styles.sideBar}>
                    <div className={styles.sidebarHeader}>
                        <span className={styles.icon}>
                            <Image src={logo} alt="logo" width={24} height={24} />
                        </span> 
                        <h2 className={styles.title}>Admin Panel</h2>
                    </div>
                    <div 
                        className={`${styles.sidebarItem} ${activeItem === 'dashboard' ? styles.active : ''}`}
                        onClick={() => handleItemClick('dashboard')}
                    >
                        <span className={styles.icon}>
                            <Image src={dash} alt="Dashboard" width={24} height={24} />
                        </span>
                        Dashboard
                    </div>
                    <div 
                        className={`${styles.sidebarItem} ${activeItem === 'network' ? styles.active : ''}`}
                        onClick={() => handleItemClick('network')}
                    >
                        <span className={styles.icon}>
                            <Image src={network} alt="Network" width={24} height={24} />
                        </span> 
                        Network
                    </div>
                    <div 
                        className={`${styles.sidebarItem} ${activeItem === 'control' ? styles.active : ''}`}
                        onClick={() => handleItemClick('control')}
                    >
                        <span className={styles.icon}>
                            <Image src={control} alt="Control" width={24} height={24} />
                        </span> 
                        Control
                    </div>
                    <div className={styles.adminSection}>
                        <div className={styles.divhakkbrk}>
                            <span className={styles.icon}>
                                <Image src={avatar} alt="Admin Avatar" width={40} height={40} />
                            </span>
                            <span className={styles.adminName}>admin_user</span>
                        </div>
                        <div className={styles.logout}>
                            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
                <div className={styles.mainContent}>
                    {activeItem === 'dashboard' && <Charts />}
                    {activeItem === 'network' && <NetworkTopology />}
                    {activeItem === 'control' && <ControlPanel />}
                    {activeItem === '' && <div>Select an option from the sidebar</div>} {/* Optional message when no item is selected */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
