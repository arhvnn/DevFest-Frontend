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
  const [totalBandwidth, setTotalBandwidth] = useState<number>(0);

  const fetchData = async () => {
    try {
      const bandwidthResponse = await axios.get('http://localhost:3002/bandwidth', {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Bandwidth Response:", bandwidthResponse.data);
      setBandwidthData(bandwidthResponse.data);

      const clientsResponse = await axios.get('http://localhost:3002/clients', {
          headers: { 'Content-Type': 'application/json' },
      });
      console.log("Clients Response:", clientsResponse.data);
      setClientsData(clientsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 5 seconds
    }, 5000);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);

  useEffect(() => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).getTime(); // Get the timestamp for one hour ago
    const filteredData = bandwidthData.filter(item => new Date(item.timestamp).getTime() >= oneHourAgo);
    
    const total = filteredData.reduce((acc, curr) => acc + curr.requested_bandwidth, 0);
    setTotalBandwidth(total);
    console.log("Total Bandwidth in the last hour:", total);
  }, [bandwidthData]);

  return (
    <div className={styles.container}>
      <div style={{ margin: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", marginBottom: "4vh" }}>
          <Typography style={{ marginBottom: "1" }} variant="h4" fontWeight="900" color={colors.grey[100]}>
            Dashboard
          </Typography>
          <Typography style={{ color: "#00A5E0", fontSize: "16px", fontWeight: "700", fontFamily: "Poppins" }}>
            Welcome to your dashboard
          </Typography>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "140px",
            gap: "20px",
          }}
        >
          <div
            style={{
              gridColumn: "span 8",
              gridRow: "span 2",
              backgroundColor: colors.primary[400],
            }}
          >
            <div
              style={{
                height: "50px",
                marginTop: "25px",
                padding: "0 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                  Total Bandwidth
                </Typography>
                <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                  {totalBandwidth} {/* Display total requested bandwidth */}
                </Typography>
              </div>
            </div>
            <div style={{ height: "270px", margin: "-20px 0 0 0" }}>
              <LineChart data={bandwidthData} isDashboard={true} />
            </div>
          </div>

          <div
            style={{
              gridColumn: "span 4",
              gridRow: "span 4",
              backgroundColor: colors.primary[400],
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `4px solid ${colors.primary[500]}`,
                padding: "15px",
              }}
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Recent Clients
              </Typography>
            </div>
            {clientsData.map((client) => (
              <div
                key={client.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: `4px solid ${colors.primary[500]}`,
                  padding: "15px",
                }}
              >
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
          </div>

          <div
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: colors.primary[400],
              padding: "30px",
            }}
          >
            <Typography variant="h5" fontWeight="600">
              Pie Chart
            </Typography>
            <div style={{ height: "200px", marginTop: "25px" }}>
              <PieChart data={bandwidthData} isDashboard={true} />
            </div>
          </div>
          
          <div
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              backgroundColor: colors.primary[400],
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              BarChart
            </Typography>
            <div style={{ height: "250px", marginTop: "-20px" }}>
              <BarChart data={bandwidthData} isDashboard={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
