import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";
import {
  Typography,
  Avatar,
  Box,
  Card,
  CardHeader,
  Fade,
  Backdrop,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useSelector } from "react-redux";
import Loading from "./Loading";

// gets the accumulated activity of the device in the last 24 hours
const getAccumulatedActivity = (device) => {
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  const relevantDataPoints = device?.data?.datapoints?.filter((datapoint) => {
    const datapointTime = new Date(datapoint.time);
    datapointTime.setHours(datapointTime.getHours() + 7); // UTC to PST

    return datapointTime >= twentyFourHoursAgo;
  });

  if (!relevantDataPoints || relevantDataPoints.length === 0) {
    return { x: 0, y: 0 };
  }

  const accumulatedActivity = relevantDataPoints.reduce(
    (acc, datapoint) => {
      const { x, y } = datapoint.raw_activity;
      return { x: acc.x + x, y: acc.y + y };
    },
    { x: 0, y: 0 }
  );

  return accumulatedActivity;
};

const Overview = ({ device }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { apiaries, isLoading, isError, message } = useSelector(
    (state) => state.apiary
  );

  const [isOnline, setIsOnline] = useState(false);
  const [offlineTime, setOfflineTime] = useState(null);

  const { x, y } = getAccumulatedActivity(device);

  // check if device is online
  useEffect(() => {
    if (device?.data?.datapoints) {
      let lastDataPoint =
        device?.data.datapoints[device?.data.datapoints.length - 1];

      if (!lastDataPoint) {
        setIsOnline(false);
        setOfflineTime(null);
        return;
      }
      const lastDataPointTime = new Date(lastDataPoint.time);
      lastDataPointTime.setHours(lastDataPointTime.getHours() + 7); // UTC+7
      const currentTime = new Date();

      const timeDiff =
        (currentTime.getTime() - lastDataPointTime.getTime()) / 1000;
      const isWithin = timeDiff <= 60 * 60 * 3; // last data point within 3 hours

      setIsOnline(isWithin);
      setOfflineTime(isWithin ? null : timeDiff);
    }
  }, [device, setIsOnline]);

  // if no device is selected, show message
  if (!device) {
    return (
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Select a device to view overview
      </Typography>
    );
  } else if (isLoading) {
    // if loading, show loading screen
    return (
      <Fade in={isLoading}>
        <Backdrop
          sx={{
            color: "secondary.main",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Loading />
        </Backdrop>
      </Fade>
    );
  } else {
    // if device is selected, show overview
    const formatOfflineTime = (offlineTime) => {
      if (!offlineTime) {
        return "";
      }

      const days = Math.floor(offlineTime / 86400);
      const hours = Math.floor((offlineTime % 86400) / 3600);
      const minutes = Math.floor((offlineTime % 3600) / 60);

      const dayString = days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "";
      const hourString =
        hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
      const minuteString =
        minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";

      const timeStrings = [dayString, hourString, minuteString].filter(
        (str) => str !== ""
      );

      return timeStrings.join(", ");
    };

    return (
      <div>
        <Typography variant="h4">{"Overview"}</Typography>
        {isOnline ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              align: "center",
              bgcolor: "transparent",
              p: 4,
              borderRadius: `24px`,
              maxWidth: "1000px",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <Card
              sx={{
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "primary.dark",
                mt: 2,
                borderRadius: `24px`,
              }}
            >
              <CardHeader
                sx={{
                  display: "flex",
                  flex: "1",
                }}
                avatar={
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      m: 1,
                      color: "onSecondary.main",
                      bgcolor: colors.greenAccent[500],
                    }}
                  >
                    <CheckCircleOutlineOutlinedIcon />
                  </Avatar>
                }
                title={<Typography variant="h5">Online</Typography>}
              />
            </Card>
            <Card
              sx={{
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "primary.dark",
                mt: 2,
                borderRadius: `24px`,
              }}
            >
              <CardHeader
                sx={{
                  display: "flex",
                  flex: "1",
                }}
                avatar={
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      m: 1,
                      color: "onSecondary.main",
                      bgcolor: "secondary.main",
                    }}
                  >
                    <AddCircleOutlineOutlinedIcon />
                  </Avatar>
                }
                title={
                  <Typography variant="h5">
                    {x} bees entered the hive in the last 24 hours
                  </Typography>
                }
              />
            </Card>
            <Card
              sx={{
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "primary.dark",
                mt: 2,
                borderRadius: `24px`,
              }}
            >
              <CardHeader
                sx={{
                  display: "flex",
                  flex: "1",
                }}
                avatar={
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      m: 1,
                      color: "onSecondary.main",
                      bgcolor: "secondary.main",
                    }}
                  >
                    <RemoveCircleOutlineOutlinedIcon />
                  </Avatar>
                }
                title={
                  <Typography variant="h5">
                    {y} bees exited the hive in the last 24 hours
                  </Typography>
                }
              />
            </Card>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              align: "center",
              bgcolor: "transparent",
              p: 2,
              borderRadius: `24px`,
              maxWidth: "1000px",
            }}
          >
            <Card
              sx={{
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "primary.dark",
                mt: 2,
                borderRadius: `24px`,
              }}
            >
              <CardHeader
                sx={{
                  display: "flex",
                  flex: "1",
                }}
                avatar={
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      m: 1,
                      color: "onSecondary.main",
                      bgcolor: "err.main",
                    }}
                  >
                    <CancelOutlinedIcon />
                  </Avatar>
                }
                title={
                  <Typography variant="h5">
                    Offline for {formatOfflineTime(offlineTime)}
                  </Typography>
                }
              />
            </Card>
            <Card
              sx={{
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "primary.dark",
                mt: 2,
                borderRadius: `24px`,
              }}
            >
              <CardHeader
                sx={{
                  display: "flex",
                  flex: "1",
                }}
                avatar={
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      m: 1,
                      color: "onSecondary.main",
                      bgcolor: "secondary.main",
                    }}
                  >
                    <AddCircleOutlineOutlinedIcon />
                  </Avatar>
                }
                title={
                  <Typography variant="h5">
                    {x} bees entered the hive in the last 24 hours
                  </Typography>
                }
              />
            </Card>
            <Card
              sx={{
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "primary.dark",
                mt: 2,
                borderRadius: `24px`,
              }}
            >
              <CardHeader
                sx={{
                  display: "flex",
                  flex: "1",
                }}
                avatar={
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      m: 1,
                      color: "onSecondary.main",
                      bgcolor: "secondary.main",
                    }}
                  >
                    <RemoveCircleOutlineOutlinedIcon />
                  </Avatar>
                }
                title={
                  <Typography variant="h5">
                    {y} bees exited the hive in the last 24 hours
                  </Typography>
                }
              />
            </Card>
          </Box>
        )}
      </div>
    );
  }
};

export default Overview;
