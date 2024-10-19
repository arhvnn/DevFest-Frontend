import { Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import { mockTransactions } from "./data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import StatBox from "./StatBox";
import PieChart from "./PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div style={{ margin: "20px" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* You can add a header here if needed */}
      </div>

      {/* GRID & CHARTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "140px",
          gap: "20px",
        }}
      >
        {/* ROW 1 */}
        <div
          style={{
            gridColumn: "span 3",
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </div>
        <div
          style={{
            gridColumn: "span 3",
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </div>
        <div
          style={{
            gridColumn: "span 3",
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </div>
        <div
          style={{
            gridColumn: "span 3",
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </div>

        {/* ROW 2 */}
        <div
          style={{
            gridColumn: "span 8",
            gridRow: "span 2",
            backgroundColor: colors.primary[400],
          }}
        >
          <div
            style={{
              marginTop: "25px",
              padding: "0 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Total
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                59342
              </Typography>
            </div>
          </div>
          <div style={{ height: "250px", margin: "-20px 0 0 0" }}>
            <LineChart isDashboard={true} />
          </div>
        </div>
        <div
          style={{
            gridColumn: "span 4",
            gridRow: "span 4",
            backgroundColor: colors.primary[400],
            overflow: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `4px solid ${colors.primary[500]}`,
              colors: colors.grey[100],
              padding: "15px",
            }}
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent
            </Typography>
          </div>
          {mockTransactions.map((transaction, i) => (
            <div
              key={`${transaction.txId}-${i}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `4px solid ${colors.primary[500]}`,
                padding: "15px",
              }}
            >
              <div>
                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>{transaction.user}</Typography>
              </div>
              <div style={{ color: colors.grey[100] }}>{transaction.date}</div>
              <div
                style={{
                  backgroundColor: colors.greenAccent[500],
                  padding: "5px 10px",
                  borderRadius: "4px",
                }}
              >
                ${transaction.cost}
              </div>
            </div>
          ))}
        </div>

        {/* ROW 3 */}
        <div
          style={{
            gridColumn: "span 4",
            gridRow: "span 2",
            backgroundColor: colors.primary[400],
            padding: "30px",
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Pie Chart
          </Typography>
          <div style={{ height: "200px", marginTop: "25px" }}>
            <PieChart isDashboard={true} />
          </div>
        </div>
        <div
          style={{
            gridColumn: "span 4",
            gridRow: "span 2",
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            BarChart
          </Typography>
          <div style={{ height: "250px", marginTop: "-20px" }}>
            <BarChart isDashboard={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
