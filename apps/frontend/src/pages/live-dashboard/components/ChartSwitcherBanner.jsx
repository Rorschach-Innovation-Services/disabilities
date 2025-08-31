import { Button, Grid } from "@mui/material";

const ChartSwitcherBanner = ({ chartView, setChartView }) => {
  const buttons = [
    { key: "sector", label: "Category (5)" },
    { key: "sub", label: "Sub-Dimension (3)" },
    { key: "full", label: "Balance Wheel (15)" },
  ];

  return (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {buttons.map((btn) => (
        <Grid item xs={4} key={btn.key}>
          <Button
            variant="text"
            onClick={() => setChartView(btn.key)}
            sx={{
              backgroundColor: chartView === btn.key ? "#95B8DF" : "transparent",
              color: chartView === btn.key ? "white" : "#95B8DF",
              width: "100%",
              ":hover": {
                backgroundColor: chartView === btn.key ? "#95B8DF" : "transparent",
              },
            }}
          >
            {btn.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default ChartSwitcherBanner;
