import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { parseISO, format } from "date-fns";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Box
        sx={{
          bgcolor: "background.default",
          color: "primary.light",
          p: 1,
        }}
      >
        <Typography variant="body2">
          {format(parseISO(label), "eeee, d MMM yyyy")}
        </Typography>
        <Typography variant="body2">
          {payload[0].value} {payload[0].unit} Bees
        </Typography>
      </Box>
    );
  }

  return null;
};

const MyXAxis = ({ data }) => {
  return (
    <XAxis
      dataKey="date"
      axisLine={false}
      tickLine={false}
      tickFormatter={(str) => {
        const date = parseISO(str);
        if (date.getDate() % 7 === 0) {
          return format(date, "MMM, d");
        }
        return "";
      }}
    />
  );
};

const Graph = ({ device }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = [
    {
      date: "2021-01-01",
      bees: 250,
      temp: 70,
    },
    {
      date: "2021-01-02",
      bees: 200,
      temp: 67,
    },
    {
      date: "2021-01-03",
      bees: 230,
      temp: 69,
    },
    {
      date: "2021-01-04",
      bees: 225,
      temp: 68,
    },
    {
      date: "2021-01-05",
      bees: 320,
      temp: 70,
    },
    {
      date: "2021-01-06",
      bees: 280,
      temp: 69,
    },
    {
      date: "2021-01-07",
      bees: 310,
      temp: 72,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="tempColor" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={colors.orangeAccent[500]}
              stopOpacity={0.5}
            />
            <stop
              offset="75%"
              stopColor={colors.orangeAccent[500]}
              stopOpacity={0.06}
            />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="beeColor" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={colors.yellowAccent[500]}
              stopOpacity={0.5}
            />
            <stop
              offset="75%"
              stopColor={colors.yellowAccent[500]}
              stopOpacity={0.06}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="bees"
          yAxisId="bees"
          stroke={colors.yellowAccent[500]}
          fill="url(#beeColor)"
        />
        <Area
          dataKey="temp"
          yAxisId="temp"
          stroke={colors.orangeAccent[500]}
          fill="url(#tempColor)"
        />

        <YAxis
          dataKey="temp"
          yAxisId="temp"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tickCount={10}
        />

        <YAxis
          dataKey="bees"
          yAxisId="bees"
          axisLine={false}
          tickLine={false}
          tickCount={10}
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);
            if (date.getDate() % 7 === 0) {
              return format(date, "MMM, d");
            }
            return "";
          }}
        />
        {/* <MyXAxis data={data} /> */}
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid opacity={0.1} vertical={false} />
        <Legend verticalAlign="bottom" height={36} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default Graph;
