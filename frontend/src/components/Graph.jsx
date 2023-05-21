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
import { Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import { useState } from "react";
import CustomTooltip from "./CustomTooltip";

const Graph = ({
  device,
  selectedFilter,
  setSelectedFilter,
  filterOptions,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [visible, setVisible] = useState({
    x: true,
    y: true,
    temp: true,
    humidity: true,
    windspeed: true,
  });

  const toggleVisibility = (e) => {
    setVisible({
      ...visible,
      [e.dataKey]: !visible[e.dataKey],
      hover: null,
    });
  };

  const [displayedDates, setDisplayedDates] = useState([]);

  if (!device) {
    return (
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Select a device to view data
      </Typography>
    );
  } else {
    console.log(device);

    let dp = [];

    if (device?.data?.datapoints?.length > 0) {
      dp = device.data.datapoints;
    }

    console.log(dp);

    const time = dp.map((dataPoint) => dataPoint.time); // extract time value from each data point

    const temp = dp
      .map((dataPoint) => Math.round(dataPoint.weather.temp * 100) / 100) // round temp value to the hundredths place
      .filter((temp) => typeof temp === "number"); // remove any non-number temp values

    const humidity = dp
      .map((dataPoint) => dataPoint.weather.humidity) // extract humidity value from each data point
      .filter((humidity) => typeof humidity === "number"); // remove any non-number humidity values

    const windspeed = dp
      .map((dataPoint) => dataPoint.weather.windspeed) // extract windspeed value from each data point
      .filter((windspeed) => typeof windspeed === "number"); // remove any non-number windspeed values

    const x = dp
      .map((dp) => dp.raw_activity.x)
      .filter((x) => typeof x === "number"); // remove any non-number x values;

    const y = dp
      .map((dp) => dp.raw_activity.y)
      .filter((y) => typeof y === "number"); // remove any non-number y values;

    const result = x.map((value, index) => {
      return {
        time: time[index],
        x: value,
        y: y[index],
        temp: temp[index],
        humidity: humidity[index],
        windspeed: windspeed[index],
      };
    });

    return (
      <>
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
              <linearGradient id="humidityColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={colors.tealAccent[500]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="75%"
                  stopColor={colors.tealAccent[500]}
                  stopOpacity={0.06}
                />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="windspeedColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={colors.grey[500]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="75%"
                  stopColor={colors.grey[100]}
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
            <Area
              dataKey="x"
              yAxisId="bees"
              stroke={colors.yellowAccent[500]}
              fill="url(#xColor)"
              name="Entering"
              hide={visible["x"] === false}
              unit={"Bees"}
            />
            <Area
              dataKey="y"
              yAxisId="bees"
              stroke={colors.pinkAccent[500]}
              fill="url(#yColor)"
              name="Exiting"
              hide={visible["y"] === false}
              unit={"Bees"}
            />
            <Area
              dataKey="temp"
              yAxisId="temp"
              stroke={colors.orangeAccent[500]}
              fill="url(#tempColor)"
              name="Temperature"
              hide={visible["temp"] === false}
              unit={"°C"}
            />
            <Area
              dataKey="humidity"
              yAxisId="humidity"
              stroke={colors.tealAccent[500]}
              fill="url(#humidityColor)"
              name="Humidity"
              hide={visible["humidity"] === false}
              unit={"%"}
            />
            <Area
              dataKey="windspeed"
              yAxisId="windspeed"
              stroke={colors.grey[100]}
              fill="url(#windspeedColor)"
              name="Wind Speed"
              hide={visible["windspeed"] === false}
              unit={"km/h"}
            />

            <YAxis
              dataKey="temp"
              yAxisId="temp"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={(number) => `${number}°C`}
            />

            <YAxis
              dataKey="humidity"
              yAxisId="humidity"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={(number) => `${number}%`}
            />

            <YAxis
              dataKey="windspeed"
              yAxisId="windspeed"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={(number) => `${number}km/h`}
            />

            <YAxis
              dataKey="x"
              yAxisId="bees"
              axisLine={false}
              tickLine={false}
              tickCount={5}
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => {
                const date = parseISO(str);
                const formattedDate = format(date, "MMM, d");

                // Check if date has already been displayed
                if (
                  date.getDate() % 7 !== 0 ||
                  displayedDates.includes(formattedDate)
                ) {
                  return "";
                } else {
                  // Add date to displayed dates array
                  setDisplayedDates([...displayedDates, formattedDate]);
                  console.log(formattedDate);

                  return formattedDate;
                }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid opacity={0.1} vertical={false} />
            <Legend
              verticalAlign="bottom"
              height={36}
              onClick={toggleVisibility}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div>
          {filterOptions.map(({ label, code, value }) => (
            <Button
              key={value}
              variant={selectedFilter === value ? "contained" : "outlined"}
              onClick={() => setSelectedFilter({ label, code, value })}
            >
              {label}
            </Button>
          ))}
        </div>
      </>
    );
  }
};

export default Graph;
