import { useState } from "react";
import styles from "./control.module.css";
import { Typography } from "@mui/material";
import Image from "next/image"; // Import the Image component from Next.js
import pcImage from "../../assets/pc.png";
import mobImage from "../../assets/mobile.png";
import blockImage from "../../assets/block.png";
import unblockImage from "../../assets/unblock.png";

const initialUsers = [
  {
    client_name: "John Doe",
    max_bandwidth: 500,
    cir: 250,
    ip_address: "192.168.0.1",
    device_type: "pc",
  },
  {
    client_name: "Jane Smith",
    max_bandwidth: 0,
    cir: 0,
    ip_address: "192.168.0.2",
    device_type: "mobile",
  },
  {
    client_name: "Alex Johnson",
    max_bandwidth: 300,
    cir: 150,
    ip_address: "192.168.0.3",
    device_type: "pc",
  },
];

const ControlPanel = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleBandwidthChange = (e, index) => {
    const updatedUsers = [...users];
    updatedUsers[index].max_bandwidth = e.target.value;
    setUsers(updatedUsers);
  };

  const handleBlockToggle = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].max_bandwidth = updatedUsers[index].max_bandwidth > 0 ? 0 : 500; // Toggle block/unblock
    setUsers(updatedUsers);
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
          <div>Actual</div>
          <div>Bandwidth</div>
          <div>Limit</div>
          <div style={{ marginLeft: 'auto' }}>Block</div>
        </div>
        <div className={styles.line}></div>

        {users.map((user, index) => (
          <div key={index} className={styles.user_row}>
            <div>
              <Image
                src={user.device_type === "pc" ? pcImage : mobImage}
                alt={user.device_type}
                className={styles.device_icon}
                width={40} // Set a width for the image
                height={40} // Set a height for the image
              />
              {user.client_name}
            </div>
            <div>{user.max_bandwidth > 0 ? "Active" : "Paused"}</div>
            <div>{user.ip_address}</div>
            <div>{user.cir}</div>
            <div>{user.max_bandwidth}</div>
            <div>
              <input
                type="number"
                value={user.max_bandwidth}
                onChange={(e) => handleBandwidthChange(e, index)}
                className={styles.limit_input}
              />
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Image
                src={user.max_bandwidth > 0 ? blockImage : unblockImage}
                alt={user.max_bandwidth > 0 ? "Block" : "Unblock"}
                className={styles.block_icon}
                width={24} // Set a width for the icon
                height={24} // Set a height for the icon
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
