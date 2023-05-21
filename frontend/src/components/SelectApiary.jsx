import {
  Box,
  useTheme,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { tokens } from "../theme";

const SelectApiary = ({
  apiaries,
  apiary,
  device,
  setApiary,
  setDevice,
  setSelectedFilter,
  selectedFilter,
  filterOptions,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onChange = (e) => {
    setApiary(e.target.value);
  };

  const onChange2 = (e) => {
    setDevice(e.target.value);
    setSelectedFilter(filterOptions[0]);
  };

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

export default SelectApiary;
