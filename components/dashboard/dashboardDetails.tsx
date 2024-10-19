import { Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import styles from "./dashboard.module.css";
import axios from 'axios';
import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [bandwidthData, setBandwidthData] = useState<any[]>([]);
  const [clientsData, setClientsData] = useState<any[]>([]);
  // const [totalBandwidthKbps, setTotalBandwidthKbps] = useState<number>(0);
  // const [totalBandwidthMbps, setTotalBandwidthMbps] = useState<number>(0);

  const fetchData = async () => {
    try {
      const [bandwidthResponse, clientsResponse] = await Promise.all([
        axios.get('http://localhost:3002/bandwidth', {
          headers: { 'Content-Type': 'application/json' },
        }),
        axios.get('http://localhost:3002/clients', {
          headers: { 'Content-Type': 'application/json' },
        })
      ]);

      console.log("Bandwidth Response:", bandwidthResponse.data);
      setBandwidthData(bandwidthResponse.data);

      console.log("Clients Response:", clientsResponse.data);
      setClientsData(clientsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
    const intervalId = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);

  // Stop calculating total bandwidth for now
  /*
  useEffect(() => {
    const totalKbps = bandwidthData.reduce((acc, curr) => {
      return acc + parseFloat(curr.allocated_bandwidth || 0); // Handle potential undefined
    }, 0);
    setTotalBandwidthKbps(totalKbps);
    setTotalBandwidthMbps(totalKbps / 1000); // Convert to Mbps

    console.log("Total Allocated Bandwidth (kbps):", totalKbps);
    console.log("Total Allocated Bandwidth (Mbps):", totalKbps / 1000);
  }, [bandwidthData]);
  */

  // Extract user names for line chart
  const userNames = clientsData.map(client => client.client_name);

  return (
    <div className={styles.container}>
      <div style={{ margin: "20px" }}>
        <header style={{ marginBottom: "4vh" }}>
          <Typography variant="h4" fontWeight="900" color={colors.grey[100]}>
            Dashboard
          </Typography>
          <Typography style={{ color: "#00A5E0", fontSize: "16px", fontWeight: "700", fontFamily: "Poppins" }}>
            Welcome to your dashboard
          </Typography>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "140px",
            gap: "20px",
          }}
        >
          <section style={{ gridColumn: "span 8", gridRow: "span 2", backgroundColor: colors.primary[400] }}>
            <header style={{ height: "50px", marginTop: "25px", padding: "0 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                  Total Allocated Bandwidth
                </Typography>
                {/* Temporarily remove the bandwidth display */}
                {/* <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                  {totalBandwidthMbps.toFixed(2)} Mbps
                </Typography> */}
              </div>
            </header>
            <div style={{ height: "270px", margin: "-20px 0 0 0" }}>
              <LineChart data={bandwidthData} labels={userNames} isDashboard={true} />
            </div>
          </section>

          <section style={{ gridColumn: "span 4", gridRow: "span 4", backgroundColor: colors.primary[400], overflow: "auto" }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `4px solid ${colors.primary[500]}`, padding: "15px" }}>
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Recent Clients
              </Typography>
            </header>
            {clientsData.map((client) => (
              <div key={client.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `4px solid ${colors.primary[500]}`, padding: "15px" }}>
                <div>
                  <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                    {client.client_name}
                  </Typography>
                  <Typography color={colors.grey[100]}>{client.ip_address}</Typography>
                </div>
                <div style={{ color: colors.grey[100] }}>
                  {new Date(client.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </section>

          <section style={{ gridColumn: "span 4", gridRow: "span 2", backgroundColor: colors.primary[400], padding: "30px" }}>
            <Typography variant="h5" fontWeight="600">Pie Chart</Typography>
            <div style={{ height: "200px", marginTop: "25px" }}>
              <PieChart data={bandwidthData} isDashboard={true} />
            </div>
          </section>

          <section style={{ gridColumn: "span 4", gridRow: "span 2", backgroundColor: colors.primary[400] }}>
            <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>Bar Chart</Typography>
            <div style={{ height: "250px", marginTop: "-20px" }}>
              <BarChart data={bandwidthData} isDashboard={true} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
