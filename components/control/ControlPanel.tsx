import { ChangeEvent, useEffect, useState } from "react";
import styles from "./control.module.css";
import { Typography } from "@mui/material";
import Image from "next/image";
import pcImage from "../../assets/pc.png";
import mobImage from "../../assets/mobile.png";
import laptopImage from "../../assets/pc.png"; 
import tabletImage from "../../assets/mobile.png"; 
import blockImage from "../../assets/block.png";
import unblockImage from "../../assets/unblock.png";

const ControlPanel = () => {
  const [users, setUsers] = useState([]);

  // Fetch clients and bandwidth data
  const fetchData = async () => {
    try {
      const clientsResponse = await fetch("http://localhost:3002/clients");
      const bandwidthResponse = await fetch("http://localhost:3002/bandwidth");

      const clientsData = await clientsResponse.json();
      const bandwidthData = await bandwidthResponse.json();

      const combinedData = clientsData.map((client: { id: any; max_bandwidth: number; }) => ({
        ...client,
        allocated_bandwidth: bandwidthData.find((bw: { client_id: any; }) => bw.client_id === client.id)?.allocated_bandwidth || 0,
        max_bandwidth: client.max_bandwidth || 0,
        original_max_bandwidth: client.max_bandwidth || 0, // New property to store the original max bandwidth
        isBlocked: client.max_bandwidth === 0 // New property to track block status
      }));

      setUsers(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run once on mount

  const handleLimitChange = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedUsers = [...users];
    const newMaxBandwidth = e.target.value; // Get the new max bandwidth
    updatedUsers[index].max_bandwidth = newMaxBandwidth; // Update max_bandwidth based on input
    setUsers(updatedUsers);
  
    try {
      const response = await fetch(`http://localhost:3002/clients/${updatedUsers[index].id}`, {
        method: "PUT", // Use PUT to update the resource
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          max_bandwidth: newMaxBandwidth,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update max bandwidth");
      }

      const result = await response.json();
      console.log("Update successful:", result);

      // Fetch the updated data after changing the bandwidth
      fetchData();
      
    } catch (error) {
      console.error("Error updating max bandwidth:", error);
    }
  };

  const handleBlockToggle = (index: number) => {
    const updatedUsers = [...users];
    const currentUser = updatedUsers[index];

    // Toggle block/unblock
    if (currentUser.isBlocked) {
      // Unblock the user by restoring to original max_bandwidth
      currentUser.max_bandwidth = currentUser.original_max_bandwidth; 
    } else {
      // Block the user
      currentUser.max_bandwidth = 0; 
    }
    currentUser.isBlocked = !currentUser.isBlocked; // Toggle block status

    setUsers(updatedUsers);
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
          <div style={{ marginLeft: 'auto' }}>Block</div>
        </div>
        <div className={styles.line}></div>

        {users.map((user, index) => (
          <div key={index} className={styles.user_row}>
            <div>
              <Image
                src={getDeviceImage(user.device_type)} // Use the function to get the image based on device type
                alt={user.device_type}
                className={styles.device_icon}
                width={40}
                height={40}
              />
              {user.client_name}
            </div>
            <div>{user.allocated_bandwidth > 0 ? "Active" : "Paused"}</div>
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
            <div style={{ marginLeft: 'auto' }}>
              <Image
                src={user.isBlocked ? unblockImage : blockImage}
                alt={user.isBlocked ? "Unblock" : "Block"}
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
