"use client";
import styles from "./NetworkTopology.module.css";
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";
import pcImage from "../../assets/pc.png";
import mobileImage from "../../assets/mobile.png";
import axios from 'axios';

const NetworkTopology = () => {
  const networkRef = useRef(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Fetching clients from the server
        const response = await axios.get('http://localhost:3001/clients');
        const clients = response.data; // Assuming the API response returns an array of client objects

        console.log("Clients fetched:", clients); // Log the clients data for debugging

        // Check if the response is an array
        if (!Array.isArray(clients)) {
          throw new Error("Expected clients to be an array");
        }

        // Map the clients to nodes for visualization
        const nodes = clients.map((client, index) => ({
          id: index + 1, // Unique ID for each node
          label: `${client.client_name} (${client.device_type})`, // Label for the node
          shape: "image",
          image: client.device_type === 'PC' ? pcImage.src : mobileImage.src, // Choose image based on device type
          brokenImage: client.device_type === 'PC' ? pcImage.src : mobileImage.src, // Fallback image
          size: client.device_type === 'PC' ? 30 : 20, // Set size based on device type
        }));

        // Example edges (customize as needed)
        const edges = [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 1, to: 4 },
          { from: 1, to: 5 },
        ];

        const data = { nodes, edges };
        const options = {
          nodes: {
            shape: 'image',
            size: 20, // Default size for nodes
          },
          edges: {
            smooth: {
              enabled: true, // Enable smooth edges
              type: 'continuous', // Type of smoothing
              roundness: 0.5, // Degree of roundness (0 to 1)
            },
            width: 2,
          },
          layout: {
            improvedLayout: false, // Disable improved layout for manual control
          },
          physics: {
            enabled: true,
            solver: 'repulsion', // Use repulsion force to spread nodes apart
            repulsion: {
              nodeDistance: 100, // Distance between nodes
            },
          },
        };

        // Create the network visualization
        if (networkRef.current) {
          const network = new Network(networkRef.current, data, options);
          return () => {
            network.destroy(); // Clean up on component unmount
          };
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClients(); // Call the fetch function
  }, []);

  return (
    <div className={styles.container}>
      <div ref={networkRef} style={{ height: "100%" }} />
    </div>
  );
};

export default NetworkTopology;
