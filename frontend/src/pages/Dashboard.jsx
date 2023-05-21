import { Box, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getApiariesWithDeviceData,
  reset as apiaryReset,
} from "../features/apiary/apiary.slice";
import { toast } from "react-toastify";
import Graph from "../components/Graph";
import Overview from "../components/Overview";
import SelectApiary from "../components/SelectApiary";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useSelector((state) => state.auth);
  const { apiaries, isLoading, isError, message } = useSelector(
    (state) => state.apiary
  );

  const filterOptions = [
    { label: "1 Day", code: "1day", value: 1 },
    { label: "1 Week", code: "1week", value: 7 },
    { label: "1 Month", code: "1month", value: 30 },
    { label: "3 Months", code: "3month", value: 90 },
    { label: "6 Months", code: "6month", value: 180 },
    { label: "1 Year", code: "1year", value: 365 },
    { label: "2 Year", code: "2year", value: 730 },
    { label: "all", value: Infinity },
  ];

  const [apiary, setApiary] = useState("");
  const [device, setDevice] = useState("");
  const [ovDevice, setOvDevice] = useState("");
  const [selectedFilter, setSelectedFilter] = useState({
    label: "initial",
    code: "init",
    value: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getApiariesWithDeviceData({ filter: selectedFilter.code }));

    return () => {
      dispatch(apiaryReset());
    };
  }, [user, navigate, dispatch, selectedFilter]);

  useEffect(() => {
    if (apiaries.length > 0 && apiary && device) {
      const selectedDevice = apiaries
        .find((a) => a.name === apiary.name)
        .devices.find((d) => d.name === device.name);
      if (selectedDevice) {
        setDevice(selectedDevice);
      }
    }
    if (selectedFilter.code === "1day") {
      setOvDevice(device);
    }
  }, [apiaries, apiary, device, selectedFilter.code]);

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        toastID: "dashboardError",
        hideProgressBar: true,
        theme: "colored",
      });
    }
  }, [isError, message]);

  return (
    <>
      <SelectApiary
        apiaries={apiaries}
        apiary={apiary}
        device={device}
        setApiary={setApiary}
        setDevice={setDevice}
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
        filterOptions={filterOptions}
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
                minHeight: "25vh",
                p: 4,
                height: "100%",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "primary.light", pt: 4, pb: 2 }}
              >
                {device.name}
              </Typography>
              <Graph
                device={device}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                filterOptions={filterOptions}
              />
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
                minHeight: "25vh",
                p: 4,
                height: "100%",
              }}
            >
              <Overview device={ovDevice} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
