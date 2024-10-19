import { Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import styles from "./dashboard.module.css";
import axios from 'axios';
import React, { useEffect, useState, useRef } from "react";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [bandwidthData, setBandwidthData] = useState<any[]>([]);
  const [clientsData, setClientsData] = useState<any[]>([]);
  const [totalBandwidthKbps, setTotalBandwidthKbps] = useState<number>(0);
  const [totalBandwidthMbps, setTotalBandwidthMbps] = useState<number>(0);

  // useRef to store the initial data for the LineChart
  const initialClientsData = useRef<any[]>([]);
  const initialUserNames = useRef<string[]>([]);
  const isFirstRender = useRef(true); // To track the first render

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

      setBandwidthData(bandwidthResponse.data);
      setClientsData(clientsResponse.data);

      // Store the initial data for the LineChart only once
      if (isFirstRender.current) {
        initialClientsData.current = clientsResponse.data;
        initialUserNames.current = clientsResponse.data.map(client => client.client_name);
        isFirstRender.current = false; // Mark that we've used the initial data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
    const intervalId = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);

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
          <section style={{ gridColumn: "span 8", gridRow: "span 2", backgroundColor: colors.primary[400], borderRadius: "25px" }}>
            <header style={{ height: "50px", marginTop: "25px", padding: "0 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Typography style={{ marginTop: "13px" }} variant="h5" fontWeight="600" color={colors.grey[100]}>
                  Total Allocated Bandwidth
                </Typography>
                <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                  {totalBandwidthMbps.toFixed(2)} Mbps
                </Typography>
              </div>
            </header>
            <div style={{ height: "270px", margin: "-20px 0 0 0", borderRadius: "25px" }}>
              <LineChart
                clients={initialUserNames}
                clientsData={initialClientsData.current}
                bandwidthData={bandwidthData}
                isDashboard={true}
              />
            </div>
          </section>

          <section style={{ gridColumn: "span 4", gridRow: "span 4", backgroundColor: colors.primary[400], overflow: "auto", borderRadius: "25px" }}>
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

          <section style={{ gridColumn: "span 4", gridRow: "span 2", backgroundColor: colors.primary[400], padding: "30px", borderRadius: "25px" }}>
            <Typography variant="h5" fontWeight="600">Allocated Bandwidth by Client</Typography>
            <div style={{ height: "200px", marginTop: "25px" }}>
              <PieChart
                clients={clientsData}
                bandwidthData={bandwidthData}
              />
            </div>
          </section>

          <section style={{ gridColumn: "span 4", gridRow: "span 2", backgroundColor: colors.primary[400], borderRadius: "25px" }}>
            <Typography style={{ fontSize: "19px" }} variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>Used against allocated bandwidth per client</Typography>
            <div style={{ height: "250px", marginTop: "-20px" }}>
              <BarChart clients={clientsData}
                bandwidthData={bandwidthData}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
