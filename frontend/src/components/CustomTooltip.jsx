import { parseISO, format } from "date-fns";
import { Box, Typography } from "@mui/material";

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

export default CustomTooltip;
