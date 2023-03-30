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
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { updateApiary } from "../features/apiary/apiary.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  setApiary,
  reset as apiaryReset,
} from "../features/apiary/apiary.slice";
import { toast } from "react-toastify";

const AddApiaryCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useSelector((state) => state.auth);

  const [expand, setExpand] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const { name, location } = formData;

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
      location,
    };

    dispatch(setApiary(apiaryData));
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
              label="Apiary Name"
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
            >
              Create Apiary
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
};

export default AddApiaryCard;
