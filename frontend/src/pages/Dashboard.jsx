import Topbar from "../components/Topbar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  createTheme,
  Grid,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
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
import Graph from "../components/Graph";

const SelectApiary = ({ apiaries, apiary, device, setApiary, setDevice }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onChange = (e) => {
    setApiary(e.target.value);
  };

  const onChange2 = (e) => {
    setDevice(e.target.value);
  };

  console.log(device);

  return (
    <Box sx={{ px: 4, pt: 4 }}>
      <FormControl variant="filled" sx={{ pr: 2, width: 300 }}>
        <InputLabel id="apiary-label">Apiary</InputLabel>
        <Select labelId="apiary-label" value={apiary} onChange={onChange}>
          {apiaries?.map((apiary) => (
            <MenuItem key={apiary._id} value={apiary}>
              {apiary.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ width: 300 }}>
        <InputLabel id="device-label">Device</InputLabel>
        <Select labelId="device-label" value={device} onChange={onChange2}>
          {apiary.devices?.map((device) => {
            return (
              <MenuItem key={device._id} value={device}>
                {device.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
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

  const [apiary, setApiary] = useState("");
  const [device, setDevice] = useState("");

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getApiaries());

    return () => {
      dispatch(apiaryReset());
      //navigate("/");
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <>
      <SelectApiary
        apiaries={apiaries}
        apiary={apiary}
        device={device}
        setApiary={setApiary}
        setDevice={setDevice}
      />
      <Box sx={{ width: "100%", px: 4, pt: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 2 }}
          align="center"
          justifyContent="center"
          sx={{ minWidth: "200px" }}
        >
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
                {device.name}
              </Typography>
              <Graph device={device} />
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
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
