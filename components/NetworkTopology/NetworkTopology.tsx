"use client";
import styles from "./NetworkTopology.module.css";
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";
import pcImage from "../../assets/pc.png";
import mobileImage from "../../assets/mobile.png";
import laptopImage from "../../assets/pc.png"; 
import routerImage from "../../assets/modem.png"; // Added Router image
import axios from 'axios'; // Import axios

const NetworkTopology = () => {
  const networkRef = useRef<HTMLDivElement | null>(null);
  const networkInstanceRef = useRef<Network | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3002/clients', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const clients = response.data; // Assuming the API response returns an array of client objects

        console.log("Clients fetched:", clients); // Log the clients data for debugging

        // Check if the response is an array
        if (!Array.isArray(clients)) {
          throw new Error("Expected clients to be an array");
        }

        // Map the clients to nodes for visualization
        const nodes = clients.map((client) => ({
          id: client.id, // Use client ID for unique identification
          label: `${client.client_name} (${client.device_type})`, // Label for the node
          shape: "image",
          image:
            client.device_type === 'PC' ? pcImage.src :
            client.device_type === 'Laptop' ? laptopImage.src : // Use laptop image for laptops
            client.device_type === 'Tablet' ? mobileImage.src : 
            mobileImage.src, // Default fallback image for smartphones
          brokenImage: pcImage.src, // Fallback image
          size: client.device_type === 'PC' ? 30 : 20, // Set size based on device type
        }));

        // Add a router node
        const routerNode = {
          id: 0, // Unique ID for the router
          label: 'Router',
          shape: 'image',
          image: routerImage.src,
          brokenImage: routerImage.src,
          size: 50, // Size of the router node
        };

        // Example edges connecting clients to the router
        const edges = clients.map(client => ({
          from: client.id,
          to: routerNode.id,
        }));

        // Combine nodes
        const data = {
          nodes: [...nodes, routerNode], // Include router node in the nodes array
          edges,
        };

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
          networkInstanceRef.current = new Network(networkRef.current, data, options);
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchClients(); // Call the fetch function

    return () => {
      if (networkInstanceRef.current) {
        networkInstanceRef.current.destroy(); // Clean up the network instance on component unmount
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={networkRef} style={{ height: "100%" }} />
    </div>
  );
};

export default NetworkTopology;
