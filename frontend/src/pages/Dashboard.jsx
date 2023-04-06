import Topbar from "../components/Topbar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  createTheme,
  Grid,
} from "@mui/material";
import { tokens } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  getApiaries,
  reset as apiaryReset,
} from "../features/apiary/apiary.slice";
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
import { toast } from "react-toastify";

const src = "https://www.youtube.com/watch?v=h8SZV12pnmo";

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

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useSelector((state) => state.auth);
  const { apiaries, isLoading, isError, message } = useSelector(
    (state) => state.apiary
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        toastID: "manageError",
        hideProgressBar: true,
        theme: "colored",
      });
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getApiaries());

    return () => {
      dispatch(apiaryReset());
    };
  }, [user, navigate, isError, message, dispatch]);

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
    <Box sx={{ width: "100%", px: 4 }}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 2 }}
        align="center"
        justifyContent="center"
        sx={{ minWidth: "200px" }}
      >
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              align: "center",
              bgcolor: "primary.dark",
              borderRadius: `24px`,
              height: "360px",
            }}
          >
            apiary status, devices online
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              align: "center",
              bgcolor: "primary.dark",
              borderRadius: `24px`,
              height: "360px",
            }}
          >
            daily count so far (up or down from yesterday)
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              align: "center",
              bgcolor: "primary.dark",
              borderRadius: `24px`,
              height: "360px",
            }}
          >
            weather at this location
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              align: "center",
              bgcolor: "primary.dark",
              borderRadius: `24px`,
              height: "440px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "primary.light", pt: 4, pb: 2 }}
            >
              Bee Activity
            </Typography>
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={data}>
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
                <YAxis
                  dataKey="bees"
                  yAxisId="bees"
                  axisLine={false}
                  tickLine={false}
                  tickCount={10}
                />
                <YAxis
                  dataKey="temp"
                  yAxisId="temp"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tickCount={10}
                />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid opacity={0.1} vertical={false} />
                <Legend verticalAlign="bottom" height={36} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              align: "center",
              bgcolor: "primary.dark",
              borderRadius: `24px`,
              height: "440px",
            }}
          >
            video feed
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
