import { Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import { mockTransactions } from "./data/mockData";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import StatBox from "./StatBox";
import PieChart from "./PieChart";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className={styles.container}>
      <div style={{ margin: "20px" }}>
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between" ,flexDirection : "column", marginBottom : "2vh"}}>
          <Typography variant="h4" fontWeight="900" color={colors.grey[100]}>
            Dashboard
          </Typography>

          <Typography style={{color : "#00A5E0", fontSize : "16px", fontWeight : "700", fontFamily : "Poppins"}}>Welcome to your dashboard</Typography>
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
          {/* Removed the four StatBox cards */}

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
                height: "50px",
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
            <div style={{ height: "270px", margin: "-20px 0 0 0" }}>
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
    </div>
  );
};

export default Dashboard;
