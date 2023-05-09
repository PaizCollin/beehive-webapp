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
import { useState } from "react";

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
          {/* {format(parseISO(label), "eeee, d MMM yyyy")} */}
        </Typography>
        {payload[0] ? (
          <Typography variant="body2">
            {payload[0].value} {payload[0].unit} Entering
          </Typography>
        ) : null}
        {payload[0] ? (
          <Typography variant="body2">
            {payload[1].value} {payload[1].unit} Entering
          </Typography>
        ) : null}
        {payload[0] ? (
          <Typography variant="body2">
            {payload[2].value} {payload[2].unit} Entering
          </Typography>
        ) : null}
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

  console.log(device);

  const labels = [
    {
      key: "temp",
      color: colors.orangeAccent[500],
    },
    {
      key: "x",
      color: colors.yellowAccent[500],
    },
    {
      key: "y",
      color: colors.pinkAccent[500],
    },
  ];

  const [barProps, setBarProps] = useState(
    labels.reduce(
      (a, { key }) => {
        a[key] = false;
        return a;
      },
      { hover: null }
    )
  );

  const handleLegendMouseEnter = (e) => {
    if (!barProps[e.dataKey]) {
      setBarProps({ ...barProps, hover: e.dataKey });
    }
  };

  const handleLegendMouseLeave = (e) => {
    setBarProps({ ...barProps, hover: null });
  };

  const selectBar = (e) => {
    setBarProps({
      ...barProps,
      [e.dataKey]: !barProps[e.dataKey],
      hover: null,
    });
  };

  if (!device) {
    return (
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Select a device to view data
      </Typography>
    );
  } else {
    const time = device?.data.datapoints.map((dataPoint) => dataPoint.time); // extract time value from each data point

    const temp = device?.data.datapoints
      .map((dataPoint) => dataPoint.weather.temp) // extract temp value from each data point
      .filter((temp) => typeof temp === "number"); // remove any non-number temp values

    const humidity = device?.data.datapoints
      .map((dataPoint) => dataPoint.weather.humidity) // extract humidity value from each data point
      .filter((humidity) => typeof humidity === "number"); // remove any non-number humidity values

    const windSpeed = device?.data.datapoints
      .map((dataPoint) => dataPoint.weather.windSpeed) // extract windSpeed value from each data point
      .filter((windSpeed) => typeof windSpeed === "number"); // remove any non-number windSpeed values

    const x = device?.data.datapoints
      .map((dp) => dp.raw_activity.x)
      .filter((x) => typeof x === "number"); // remove any non-number x values;

    const y = device?.data.datapoints
      .map((dp) => dp.raw_activity.y)
      .filter((y) => typeof y === "number"); // remove any non-number y values;

    const result = x.map((value, index) => {
      return {
        time: time[index],
        x: value,
        y: y[index],
        temp: temp[index],
      };
    });

    return (
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={result}>
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
            <linearGradient id="xColor" x1="0" y1="0" x2="0" y2="1">
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
            <linearGradient id="yColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={colors.pinkAccent[500]}
                stopOpacity={0.5}
              />
              <stop
                offset="75%"
                stopColor={colors.pinkAccent[500]}
                stopOpacity={0.06}
              />
            </linearGradient>
          </defs>
          {/* <Area
              dataKey="x"
              yAxisId="bees"
              stroke={colors.yellowAccent[500]}
              fill="url(#xColor)"
              name="Entering"
            />
            <Area
              dataKey="y"
              yAxisId="bees"
              stroke={colors.pinkAccent[500]}
              fill="url(#yColor)"
              name="Exiting"
            />
            <Area
              dataKey="temp"
              yAxisId="temp"
              stroke={colors.orangeAccent[500]}
              fill="url(#tempColor)"
              name="Temperature"
            /> */}

          <YAxis
            dataKey="temp"
            yAxisId="temp"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tickCount={10}
            tickFormatter={(number) => `${number}°C`}
          />

          <YAxis
            dataKey="x"
            yAxisId="bees"
            axisLine={false}
            tickLine={false}
            tickCount={10}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            // tickFormatter={(str) => {
            //   const date = parseISO(str);
            //   if (date.getDate() % 7 === 0) {
            //     return format(date, "MMM, d");
            //   }
            //   return "";
            // }}
          />
          {/* <MyXAxis data={data} /> */}
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid opacity={0.1} vertical={false} />
          <Legend
            verticalAlign="bottom"
            height={36}
            onClick={selectBar}
            onMouseOver={handleLegendMouseEnter}
            onMouseOut={handleLegendMouseLeave}
          />
          {labels.map((label, index) => (
            <Area
              key={index}
              dataKey={label.key}
              stroke={label.color}
              fill={label.color}
              hide={barProps[label.key] === true}
              fillOpacity={Number(
                barProps.hover === label.key || !barProps.hover ? 1 : 0.6
              )}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
};
export default Graph;
