import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "./theme";

const LineChart = ({ clients, clientsData, bandwidthData, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Current time and cut off time for 6 hours
  const now = new Date();
  const endHour = now.getHours();
  const startHour = (endHour - 6 + 24) % 24; // Hour 6 hours ago

  // Prepare the data for the line chart
  const data = clientsData.map((client, index) => {
    // Filter bandwidth data for the current client within the last 6 hours
    const clientBandwidthData = bandwidthData.filter(b => b.client_id === client.id)
      .filter(b => new Date(b.timestamp) >= now.getTime() - 6 * 60 * 60 * 1000); // Last 6 hours

    // Sort bandwidth data by timestamp
    clientBandwidthData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Aggregate data hourly
    const hourlyData = {};
    clientBandwidthData.forEach(point => {
      const hourKey = new Date(point.timestamp).getHours();
      if (!hourlyData[hourKey]) {
        hourlyData[hourKey] = { count: 0, totalBandwidth: 0 };
      }
      hourlyData[hourKey].count += 1;
      hourlyData[hourKey].totalBandwidth += parseFloat(point.requested_bandwidth); // in kbps
    });

    // Calculate the average bandwidth for imputation
    const totalCount = Object.values(hourlyData).reduce((sum, data) => sum + data.count, 0);
    const totalBandwidth = Object.values(hourlyData).reduce((sum, data) => sum + data.totalBandwidth, 0);
    const averageBandwidth = totalCount > 0 ? (totalBandwidth / totalCount / 1000) : 0; // in Mbps

    // Create line data from hourly aggregated data
    const lineData = Array.from({ length: 7 }, (_, i) => {
      const hour = (startHour + i) % 24;
      const hourlyPoint = hourlyData[hour];

      let bandwidthValue;

      if (hourlyPoint && hourlyPoint.count > 0) {
        const averageForHour = (hourlyPoint.totalBandwidth / hourlyPoint.count / 1000); // Convert to Mbps
        const randomVariation = (Math.random() * 0.5 - 0.25); // Random variation between -0.25 and 0.25
        bandwidthValue = Math.max(0, parseFloat((averageForHour + randomVariation).toFixed(2))); // Ensure non-negative
      } else {
        // Impute using the average + a small random value
        const randomVariation = (Math.random() * 0.5 - 0.25); // Random variation between -0.25 and 0.25
        bandwidthValue = Math.max(0, parseFloat((averageBandwidth + randomVariation).toFixed(2))); // Ensure non-negative
      }

      return {
        x: hour,
        y: bandwidthValue,
      };
    });

    return {
      id: client.client_name,
      color: `hsl(${(index * 60) % 360}, 70%, 50%)`,
      data: lineData,
    };
  });

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: { stroke: colors.grey[100] },
          },
          legend: {
            text: { fill: colors.grey[100] },
          },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100] },
          },
        },
        legends: {
          text: { fill: colors.grey[100] },
        },
        tooltip: {
          container: { color: colors.primary[500] },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      height={250}
      xScale={{ type: "point" }} // Discrete hours
      yScale={{
        type: "linear",
        min: 0,
        max: 5, // Max value in Mbps
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom" // Smooth curve
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Time (Hours)",
        legendOffset: 36,
        legendPosition: "middle",
        tickValues: Array.from({ length: 7 }, (_, i) => (startHour + i) % 24),
      }}
      axisLeft={{
        orient: "left",
        tickValues: Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1)),
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Bandwidth (Mbps)",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enablePoints={true}
      pointSize={10}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderColor={{ from: "serieColor" }}
      pointBorderWidth={2}
      enableArea={true}
      areaOpacity={0.1}
      enableGridX={false}
      enableGridY={true}
      enableSlices="x"
      sliceTooltip={({ slice }) => (
        <div
          style={{
            background: colors.primary[500],
            padding: "12px",
            borderRadius: "5px",
          }}
        >
          {slice.points.map(point => (
            <div key={point.id} style={{ color: point.serieColor }}>
              {point.id}: {point.data.y.toFixed(2)} Mbps (at {point.data.x}:00)
            </div>
          ))}
        </div>
      )}
      legends={
        isDashboard
          ? []
          : [{
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 50,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.85,
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            }]
      }
    />
  );
};

export default LineChart;
