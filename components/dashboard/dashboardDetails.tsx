"use client";
import Image from 'next/image';
import eyeIcon from '../assets/eye.png'; 
import styles from "./dashboard.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "@fontsource/poppins";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400, barValue: 240 },
  { name: 'Feb', value: 300, barValue: 139 },
  { name: 'Mar', value: 500, barValue: 980 },
  { name: 'Apr', value: 600, barValue: 390 },
  { name: 'May', value: 700, barValue: 480 },
  { name: 'Jun', value: 800, barValue: 380 },
];

const DashDetails = () => {
    return (
        <>
            <div className={styles.container}>
                <h2>Monti charts hna yaa bensabra</h2>

                {/* Line Chart */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>

                {/* Bar Chart */}
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="barValue" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default DashDetails;
