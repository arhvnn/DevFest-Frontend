"use client";
import styles from "./NetworkTopology.module.css";
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";
import routerImage from "../../assets/modem.png";
import pcImage from "../../assets/pc.png";
import mobileImage from "../../assets/mobile.png";

const NetworkTopology = () => {
  const networkRef = useRef(null);

  useEffect(() => {
    if (networkRef.current) {
      const nodes = [
        {
          id: 1,
          label: "Router",
          shape: "image",
          image: routerImage.src, // Use .src to get the URL string
          brokenImage: routerImage.src, // Fallback image as URL string
          size: 60, // Larger size for router
        },
        {
          id: 2,
          label: "John (PC)",
          shape: "image",
          image: pcImage.src, // Use .src to get the URL string
          brokenImage: pcImage.src, // Fallback image as URL string
          size: 30, // Default size for PC
        },
        {
          id: 3,
          label: "Jane (Mobile)",
          shape: "image",
          image: mobileImage.src, // Use .src to get the URL string
          brokenImage: mobileImage.src, // Fallback image as URL string
          size: 20, // Default size for Mobile
        },
        {
          id: 4,
          label: "Bob (PC)",
          shape: "image",
          image: pcImage.src, // Use .src to get the URL string
          brokenImage: pcImage.src, // Fallback image as URL string
          size: 30,
        },
        {
          id: 5,
          label: "Router",
          shape: "image",
          image: routerImage.src, // Use .src to get the URL string
          brokenImage: routerImage.src, // Fallback image as URL string
          size: 60,
        },
        {
          id: 7,
          label: "John (PC)",
          shape: "image",
          image: pcImage.src, // Use .src to get the URL string
          brokenImage: pcImage.src, // Fallback image as URL string
          size: 30,
        },
        {
          id: 8,
          label: "Jane (Mobile)",
          shape: "image",
          image: mobileImage.src, // Use .src to get the URL string
          brokenImage: mobileImage.src, // Fallback image as URL string
          size: 20,
        },
        {
          id: 9,
          label: "Bob (PC)",
          shape: "image",
          image: pcImage.src, // Use .src to get the URL string
          brokenImage: pcImage.src, // Fallback image as URL string
          size: 30,
        },
        {
          id: 10,
          label: "Alice (Mobile)",
          shape: "image",
          image: mobileImage.src, // Use .src to get the URL string
          brokenImage: mobileImage.src, // Fallback image as URL string
          size: 20,
        },
      ];

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
          size: 20, // General size for other nodes if not specified
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
          improvedLayout: false, // Disable improved layout for more control over spacing
        },
        physics: {
          enabled: true,
          solver: 'repulsion', // Use repulsion force to spread nodes apart
          repulsion: {
            nodeDistance: 100, // Reduce this value to bring nodes closer
          },
        },
      };
      

      // Create the network visualization
      const network = new Network(networkRef.current, data, options);

      return () => {
        network.destroy(); // Clean up
      };
    }
  }, []);

  return (
    <div className={styles.container}>
      <div ref={networkRef} style={{ height: "100%" }} />
    </div>
  );
};

export default NetworkTopology;
