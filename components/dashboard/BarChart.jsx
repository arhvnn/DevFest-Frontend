import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "./theme";

const BarChart = ({ clients, bandwidthData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Map clients and bandwidthData
  const data = clients.map(client => {
    const clientBandwidthData = bandwidthData.filter(
      b => b.client_id === client.id
    );

    const requestFrequency = clientBandwidthData.length;
    const totalUsed = clientBandwidthData.reduce(
      (acc, b) => acc + (parseFloat(b.allocated_bandwidth) || 0), // Ensure valid number
      0
    );

    return {
      clientId: client.client_name,
      requests: requestFrequency || 0, // Ensure non-negative value
      used: totalUsed / 1000 || 0, // Convert to Mbps
    };
  });

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // Customized axis and legend text colors
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
      keys={["requests", "used"]}
      indexBy="clientId"
      margin={{ top: 50, right: 130, bottom: 50, left: 75 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Client ID",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Requests / Bandwidth (Mbps)",
        legendPosition: "middle", // Center the legend on the axis
        legendOffset: -55, // Use a negative value to move the title closer to the Y-axis
        tick: ({ x, y, formattedValue }) => (
          <text x={x} y={y} dy={-10} textAnchor="middle" fill={colors.grey[100]}>
            {formattedValue}
          </text>
        ),
      }}
      
      
      
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return `${e.id}: ${e.formattedValue} for ${e.indexValue}`;
      }}
    />
  );
};

export default BarChart;
