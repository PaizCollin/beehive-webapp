import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";
import { Typography, Avatar, Box, Card, CardHeader } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

const getAccumulatedActivity = (device) => {
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  const relevantDataPoints = device?.data?.datapoints?.filter((datapoint) => {
    const datapointTime = new Date(datapoint.time);
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

  const [isOnline, setIsOnline] = useState(false);
  const [offlineTime, setOfflineTime] = useState(null);

  const { x, y } = getAccumulatedActivity(device);

  useEffect(() => {
    if (device) {
      const lastDataPoint =
        device?.data.datapoints[device?.data.datapoints.length - 1];

      if (!lastDataPoint) {
        setIsOnline(false);
        setOfflineTime(null);
        return;
      }
      const lastDataPointTime = new Date(lastDataPoint.time);
      const currentTime = new Date();

      const timeDiff =
        (currentTime.getTime() - lastDataPointTime.getTime()) / 1000;
      const isWithinFiveMinutes = timeDiff <= 300;

      setIsOnline(isWithinFiveMinutes);
      setOfflineTime(isWithinFiveMinutes ? null : timeDiff);
    }
  }, [device, setIsOnline]);

  const formatOfflineTime = (offlineTime) => {
    if (!offlineTime) {
      return "";
    }

    const days = Math.floor(offlineTime / 86400);
    const hours = Math.floor((offlineTime % 86400) / 3600);
    const minutes = Math.floor((offlineTime % 3600) / 60);

    const dayString = days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "";
    const hourString = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
    const minuteString =
      minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";

    const timeStrings = [dayString, hourString, minuteString].filter(
      (str) => str !== ""
    );

    return timeStrings.join(", ");
  };

  if (!device) {
    return (
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Select a device to view overview
      </Typography>
    );
  } else {
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
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                color: "onSecondary.main",
                bgcolor: "secondary.main",
                alignSelf: "center",
                mb: 1,
              }}
            >
              <CheckCircleOutlineOutlinedIcon />
            </Avatar>
            <Typography variant="h6">Online</Typography>
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
                      bgcolor: "secondary.main",
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
