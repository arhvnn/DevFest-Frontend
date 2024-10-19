import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "./theme";
import { useTheme } from "@mui/material";

const PieChart = ({ clients, bandwidthData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Step 1: Aggregate allocated bandwidth by client (convert to Mbps) and calculate hourly average
  const allocatedBandwidthByClient = {};
  const entryCountByClient = {};

  bandwidthData.forEach((entry) => {
    const clientId = entry.client_id;
    const allocatedBandwidth = parseFloat(entry.allocated_bandwidth); // in kbps

    // Convert to Mbps
    const allocatedBandwidthMbps = allocatedBandwidth / 1000;

    // Initialize client entry if it doesn't exist
    if (!allocatedBandwidthByClient[clientId]) {
      allocatedBandwidthByClient[clientId] = 0;
      entryCountByClient[clientId] = 0; // Count for averaging
    }

    // Sum the allocated bandwidth in Mbps
    allocatedBandwidthByClient[clientId] += allocatedBandwidthMbps;
    entryCountByClient[clientId] += 1; // Increment the count
  });

  // Step 2: Calculate hourly averages
  const pieChartData = Object.keys(allocatedBandwidthByClient).map((clientId) => {
    const client = clients.find((c) => c.id === parseInt(clientId));
    
    // Calculate average by dividing total bandwidth by the count of entries
    const averageBandwidth = allocatedBandwidthByClient[clientId] / entryCountByClient[clientId];

    // Introduce randomness to the average bandwidth
    const randomVariation = (Math.random() * 1.5 - 0.75); // Random value between -0.75 and 0.75
    const randomizedAverageBandwidth = Math.max(0, averageBandwidth + randomVariation); // Ensure non-negative value

    return {
      id: client?.client_name || "Unknown Client",
      label: client?.client_name || "Unknown Client",
      value: randomizedAverageBandwidth, // Use randomized average for pie chart value
      color: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random color for each client
    };
  });

  return (
    <ResponsivePie
      data={pieChartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.7}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
