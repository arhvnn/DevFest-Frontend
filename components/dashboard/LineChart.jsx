import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "./theme";

// Mock Data
const data = [
  {
    id: "Client 1", // 'id' identifies each line
    color: "hsl(230, 70%, 50%)",
    data: [
      { x: "10:00 AM", y: 5 },
      { x: "10:15 AM", y: 6 },
      { x: "10:30 AM", y: 8 },
      { x: "10:45 AM", y: 7 },
      { x: "11:00 AM", y: 8 },
    ],
  },
  {
    id: "Client 2",
    color: "hsl(330, 70%, 50%)",
    data: [
      { x: "10:00 AM", y: 10 },
      { x: "10:15 AM", y: 11 },
      { x: "10:30 AM", y: 9 },
      { x: "10:45 AM", y: 10 },
      { x: "11:00 AM", y: 10 },
    ],
  },
  {
    id: "Client 3",
    color: "hsl(90, 70%, 50%)",
    data: [
      { x: "10:00 AM", y: 3 },
      { x: "10:15 AM", y: 4 },
      { x: "10:30 AM", y: 4 },
      { x: "10:45 AM", y: 3 },
      { x: "11:00 AM", y: 4 },
    ],
  }
];

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={data}
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
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }} // Time points on X-axis
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
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
        legend: isDashboard ? undefined : "Time", // Updated legend to 'Time'
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // Adjust based on data scale
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Bandwidth (Mbps)", // Updated legend to 'Bandwidth'
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
