import { ChangeEvent, useEffect, useState } from "react";
import styles from "./control.module.css";
import { Typography } from "@mui/material";
import Image from "next/image";
import pcImage from "../../assets/pc.png";
import mobImage from "../../assets/mobile.png";
import laptopImage from "../../assets/pc.png"; 
import tabletImage from "../../assets/mobile.png"; 
import blockedImage from "../../assets/block.png"; // Image for blocking
import unblockedImage from "../../assets/unblock.png"; // Image for unblocking

const ControlPanel = () => {
  const [users, setUsers] = useState([]);

  // Fetch clients and bandwidth data
  const fetchData = async () => {
    try {
      const clientsResponse = await fetch("http://localhost:3002/clients");
      const bandwidthResponse = await fetch("http://localhost:3002/bandwidth");

      const clientsData = await clientsResponse.json();
      const bandwidthData = await bandwidthResponse.json();

      const combinedData = clientsData.map((client) => ({
        ...client,
        allocated_bandwidth: bandwidthData.find((bw) => bw.client_id === client.id)?.allocated_bandwidth || 0,
        max_bandwidth: client.max_bandwidth || 0,
        original_max_bandwidth: client.max_bandwidth || 0,
      }));

      setUsers(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLimitChange = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedUsers = [...users];
    const newMaxBandwidth = parseInt(e.target.value, 10); // Ensure it's a number
    updatedUsers[index].max_bandwidth = newMaxBandwidth;
    setUsers(updatedUsers);

    try {
      const response = await fetch("http://localhost:3002/control/adjust-bandwidth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: updatedUsers[index].id,
          max_bandwidth: newMaxBandwidth,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to adjust bandwidth");
      }

      console.log("Bandwidth adjusted successfully");
    } catch (error) {
      console.error("Error adjusting bandwidth:", error);
    }
  };

  const handleBlockToggle = async (index: number) => {
    const updatedUsers = [...users];
    const currentUser = updatedUsers[index];
  
    try {
      if (currentUser.max_bandwidth === 0) {
        // Unblock by resuming the client
        const response = await fetch("http://localhost:3002/control/resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ client_id: currentUser.id }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to resume client");
        }
  
        currentUser.max_bandwidth = currentUser.original_max_bandwidth; // Reset to the original value
      } else {
        // Block the user by pausing the connection
        const response = await fetch("http://localhost:3002/control/pause", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ client_id: currentUser.id }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to pause client");
        }
  
        currentUser.max_bandwidth = 0; // Set max_bandwidth to 0 to indicate it's paused
      }
  
      setUsers(updatedUsers); // Update the state after API calls
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };
  

  const getDeviceImage = (deviceType: string) => {
    switch (deviceType) {
      case "PC":
        return pcImage;
      case "Laptop":
        return laptopImage;
      case "Tablet":
        return tabletImage;
      case "mobile":
      default:
        return mobImage;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Typography variant="h4" fontWeight="900" color="black">
          Bandwidth Control
        </Typography>
        <Typography variant="body1" fontWeight="600" color="#00A5E0">
          Control The Network
        </Typography>
      </div>

      <div className={styles.users_table}>
        <div className={styles.table_headers}>
          <div>Name</div>
          <div>Status</div>
          <div>IP Address</div>
          <div className={styles.Actual}>Actual</div>
          <div className={styles.limit}>Limit (Mbps)</div>
          <div style={{ marginLeft: "auto" }}>Block</div>
        </div>
        <div className={styles.line}></div>

        {users.map((user, index) => (
          <div key={index} className={styles.user_row}>
            <div>
              <Image
                src={getDeviceImage(user.device_type)}
                alt={user.device_type}
                className={styles.device_icon}
                width={40}
                height={40}
              />
              {user.client_name}
            </div>
            <div>
              {user.max_bandwidth > 0 ? "Active" : "Paused"}
            </div>
            <div>{user.ip_address}</div>
            <div>{user.cir}</div>
            <div>
              <input
                type="number"
                value={user.max_bandwidth}
                onChange={(e) => handleLimitChange(e, index)}
                className={styles.limit_input}
              />
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Image
                src={user.max_bandwidth > 0 ? blockedImage : unblockedImage}
                alt={user.max_bandwidth > 0 ? "Block" : "Unblock"}
                className={styles.block_icon}
                width={24}
                height={24}
                onClick={() => handleBlockToggle(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
