import {
  Grid,
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
  TextField,
  useTheme,
  Box,
  Button,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateDevice, deleteDevice } from "../features/apiary/apiary.slice";

const DeviceCard = ({ device, apiary, userRole }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useSelector((state) => state.auth);

  const [expand, setExpand] = useState();

  const [formData, setFormData] = useState({
    serial: device.serial,
    name: device.name,
    remote: device.remote,
  });

  const { name, serial, remote } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const apiaryData = {
      name,
      serial,
      remote,
      apiaryID: apiary._id,
      deviceID: device._id,
    };

    dispatch(updateDevice(apiaryData));
  };

  const onDelete = async (e) => {
    e.preventDefault();

    const data = {
      apiaryID: apiary._id,
      deviceID: device._id,
      serial: device.serial,
    };

    dispatch(deleteDevice(data));
  };

  return (
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
            {device.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={<Typography> {device.name} </Typography>}
        subheader={device.serial}
        action={
          <CardActions
            disableSpacing
            sx={{
              alignSelf: "stretch",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              m: 1,
            }}
          >
            <Grid container justify="right">
              <IconButton onClick={() => setExpand(!expand)}>
                <EditOutlinedIcon />
              </IconButton>
            </Grid>
          </CardActions>
        }
      />
      <Collapse
        in={expand}
        sx={{
          alignSelf: "center",
          px: 4,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: `24px`,
            maxWidth: "320px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Box component="form" onSubmit={onSubmit} noValidate fullWidth>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Device Name"
              name="name"
              value={name}
              autoFocus
              onChange={onChange}
              variant={"filled"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="serial"
              label="Serial Number"
              name="serial"
              value={serial}
              autoFocus
              onChange={onChange}
              variant={"filled"}
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="remote"
              label="Remote Link"
              name="remote"
              value={remote}
              autoFocus
              onChange={onChange}
              variant={"filled"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 3,
                color: "onSecondary.main",
                bgcolor: "secondary.main",
                ":hover": {
                  color: "primary.light",
                },
              }}
              disabled={userRole === "USER"}
            >
              Save Changes
            </Button>
          </Box>
          <Box component="form" onSubmit={onDelete} noValidate fullWidth>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mb: 4,
                color: "onSecondary.main",
                bgcolor: "err.main",
                ":hover": {
                  color: "err.main",
                },
              }}
              disabled={userRole === "USER"}
            >
              Delete Device
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
};

export default DeviceCard;
