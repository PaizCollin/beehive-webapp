import {
  Grid,
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
  makeStyles,
  Paper,
  useTheme,
  createTheme,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { tokens } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { updateMember } from "../features/apiary/apiary.slice";

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

const UserCard = ({ user, apiary }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [expand, setExpand] = useState();

  const [formData, setFormData] = useState({
    isChecked: user.isOwner,
  });

  const { isChecked } = formData;

  const isOwner = checkUser(apiary, user);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      isChecked: e.target.checked,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const isOwner = isChecked ? 1 : 0;
    const apiaryID = apiary._id;
    const userID = user.user._id;

    const apiaryData = {
      isOwner,
      apiaryID,
      userID,
    };

    dispatch(updateMember(apiaryData));
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
            {user.user.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={<Typography> {user.user.name} </Typography>}
        subheader={user.user.email}
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
            borderRadius: `24px`,
          }}
        >
          <Box component="form" onSubmit={onSubmit} noValidate>
            <FormControlLabel
              control={
                <Checkbox
                  value="owner"
                  color="secondary"
                  bgcolor="onSecondary.main"
                />
              }
              label="Owner?"
              onChange={onChange}
              checked={isChecked}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
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
      </Collapse>
    </Card>
  );
};

export default UserCard;
