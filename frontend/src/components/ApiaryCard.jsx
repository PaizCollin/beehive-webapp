import {
  Grid,
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
  useTheme,
  Button,
  TextField,
  Box,
} from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DeviceHubOutlinedIcon from "@mui/icons-material/DeviceHubOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { updateApiary } from "../features/apiary/apiary.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiaries,
  reset as apiaryReset,
} from "../features/apiary/apiary.slice";
import { toast } from "react-toastify";
import DeviceCard from "./DeviceCard";
import UserCard from "./UserCard";

const checkUser = async (apiary, user) => {
  var isOwner = false;
  apiary.members.forEach((member) => {
    if (member.user._id === user._id) {
      isOwner = member.isOwner;
      return;
    }
  });
  return isOwner;
};

const ApiaryCard = ({ apiary }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useSelector((state) => state.auth);

  const [expand, setExpand] = useState(false);

  const [formData, setFormData] = useState({
    name: apiary.name,
    location: apiary.location,
  });

  const { name, location } = formData;

  const isOwner = checkUser(apiary, user);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const apiaryID = apiary._id;

    const apiaryData = {
      name,
      location,
      apiaryID,
    };

    dispatch(updateApiary(apiaryData));
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
        p: 2,
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
            {apiary.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={<Typography> {apiary.name} </Typography>}
        subheader={apiary.location.coordinates}
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
      <Collapse in={expand}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            borderRadius: `24px`,
          }}
        >
          <Box component="form" onSubmit={onSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Change Apiary Name"
              name="name"
              value={name}
              autoFocus
              onChange={onChange}
              variant={"filled"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 1,
                color: "onSecondary.main",
                bgcolor: "secondary.main",
                ":hover": {
                  color: "primary.light",
                },
              }}
              disabled={!isOwner}
            >
              Save Changes
            </Button>
          </Box>
        </Box>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems="center"
          justifyContent="center"
          sx={{ minWidth: "60px" }}
        >
          <Grid item xs={10} sm={10} lg={10}>
            {/* MANAGE DEVICES */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                align: "center",
                bgcolor: "primary.dark",
                p: 4,
                borderRadius: `24px`,
                maxWidth: "1000px",
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  m: 1,
                  color: "onSecondary.main",
                  bgcolor: "secondary.main",
                  alignSelf: "center",
                }}
              >
                <DeviceHubOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h9"
                color={"primary.light"}
                mb={4}
              >
                Devices
              </Typography>
              <div className="devices">
                {apiary.devices.map((device) => (
                  <DeviceCard key={device._id} device={device} />
                ))}
              </div>
            </Box>
          </Grid>
          <Grid item xs={10} sm={10} lg={10}>
            {/* MANAGE MEMBERS */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                align: "center",
                bgcolor: "primary.dark",
                p: 4,
                borderRadius: `24px`,
                maxWidth: "1000px",
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  m: 1,
                  color: "onSecondary.main",
                  bgcolor: "secondary.main",
                  alignSelf: "center",
                }}
              >
                <GroupOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h9"
                color={"primary.light"}
                mb={4}
              >
                Beekeepers
              </Typography>
              <div className="members">
                {apiary.members.map((user) => (
                  <UserCard key={user.user._id} user={user} apiary={apiary} />
                ))}
              </div>
            </Box>
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
};

export default ApiaryCard;
