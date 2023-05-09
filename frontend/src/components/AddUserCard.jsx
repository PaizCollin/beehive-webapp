import {
  Grid,
  Avatar,
  Card,
  CardActions,
  Collapse,
  IconButton,
  useTheme,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { tokens } from "../theme";
import { useDispatch } from "react-redux";
import { setMember } from "../features/apiary/apiary.slice";

const AddUserCard = ({ apiary, userRole }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [expand, setExpand] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });

  const { email, isChecked } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      isChecked: e.target.checked,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      role: isChecked ? "ADMIN" : "USER",
      apiaryID: apiary._id,
    };

    dispatch(setMember(userData));
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
      <CardActions
        disableSpacing
        sx={{
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // m: 0.5,
        }}
      >
        <Grid container justify="center">
          <IconButton onClick={() => setExpand(!expand)}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                m: 1,
                color: "onSecondary.main",
                bgcolor: "secondary.main",
              }}
            >
              <AddOutlinedIcon />
            </Avatar>
          </IconButton>
        </Grid>
      </CardActions>
      <Collapse in={expand} sx={{ alignSelf: "center", px: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: `24px`,
            maxWidth: "320px",
          }}
        >
          <Box component="form" onSubmit={onSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoFocus
              onChange={onChange}
              variant={"filled"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="owner"
                  color="secondary"
                  bgcolor="onSecondary.main"
                />
              }
              label="Set as administrator"
              onChange={onChange}
              checked={isChecked}
              fullWidth
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
              Add Member
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
};

export default AddUserCard;
