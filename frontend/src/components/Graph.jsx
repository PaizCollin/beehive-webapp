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
import { parseISO, parse, format } from "date-fns";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import { useState } from "react";

const filterOptions = [
  { label: "1 day", value: 1 },
  { label: "1 week", value: 7 },
  { label: "1 month", value: 30 },
  { label: "3 months", value: 90 },
  { label: "6 months", value: 180 },
  { label: "1 year", value: 365 },
  { label: "2 years", value: 730 },
  { label: "All time", value: Infinity },
];

function filterData(datapoints, filterValue) {
  const filteredData = datapoints.filter((datapoint) => {
    const diffTime = Date.now() - new Date(datapoint.time).getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= filterValue;
  });
  return filteredData;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "background.default",
          color: "primary.light",
          p: 1,
        }}
      >
        <Typography variant="h6">
          {format(parseISO(label), "eeee, d MMM yyyy")}
        </Typography>
        {payload.map((p) => (
          <Typography variant="body2" color={p.color}>
            {p.name}: {p.value} {p.unit}
          </Typography>
        ))}
      </Box>
    );
  }

  return null;
};

const Graph = ({ device }) => {
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

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);

  if (!device) {
    return (
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Select a device to view data
      </Typography>
    );
  } else {
    const filteredData = filterData(device?.data.datapoints, selectedFilter);

    const time = device?.data.datapoints.map((dataPoint) => dataPoint.time); // extract time value from each data point

    const temp = device?.data.datapoints
      .map((dataPoint) => Math.round(dataPoint.weather.temp * 100) / 100) // round temp value to the hundredths place
      .filter((temp) => typeof temp === "number"); // remove any non-number temp values

    const humidity = device?.data.datapoints
      .map((dataPoint) => dataPoint.weather.humidity) // extract humidity value from each data point
      .filter((humidity) => typeof humidity === "number"); // remove any non-number humidity values

    const windspeed = device?.data.datapoints
      .map((dataPoint) => dataPoint.weather.windspeed) // extract windspeed value from each data point
      .filter((windspeed) => typeof windspeed === "number"); // remove any non-number windspeed values

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
              stroke={colors.orangeAccent[500]}
              fill="url(#tempColor)"
              name="Humidity"
              hide={visible["humidity"] === false}
              unit={"%"}
            />
            <Area
              dataKey="windspeed"
              yAxisId="windspeed"
              stroke={colors.orangeAccent[500]}
              fill="url(#tempColor)"
              name="Wind Speed"
              hide={visible["windspeed"] === false}
              unit={"kmh"}
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
              tickFormatter={(number) => `${number}kmh`}
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
          {filterOptions.map(({ label, value }) => (
            <Button
              key={value}
              variant={selectedFilter === value ? "contained" : "outlined"}
              onClick={() => setSelectedFilter(value)}
            >
              {label}
            </Button>
          ))}
          <ul>
            {filteredData.map((datapoint) => (
              <li key={datapoint.time}>{JSON.stringify(datapoint)}</li>
            ))}
          </ul>
        </div>
      </>
    );
  }
};
export default Graph;
