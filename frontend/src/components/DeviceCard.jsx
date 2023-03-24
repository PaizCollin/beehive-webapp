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
  Box,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { tokens } from "../theme";

const DeviceCard = ({ device }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [expand, setExpand] = useState();

  const [formData, setFormData] = useState({
    serial: device.serial,
    name: device.name,
    remote: device.remote,
  });

  const { isChecked } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
      <Collapse in={expand}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            borderRadius: `24px`,
          }}
        >
          <Box
            component="form"
            //onSubmit={onSubmit}
            noValidate
          >
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
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
};

export default DeviceCard;
