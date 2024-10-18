"use client";
import Image from 'next/image';
import eyeIcon from '../assets/eye.png'; 
import styles from "./dashboard.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "@fontsource/poppins"


const DashDetails = () => {
    return (
        <>
            <div className={styles.container}>Monti charts hna yaa bensabra</div>
        </>
    );
}

export default DashDetails;