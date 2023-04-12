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
  Autocomplete,
} from "@mui/material";
import parse from "autosuggest-highlight/parse";
import debounce from "lodash";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { tokens } from "../theme";
import { useDispatch } from "react-redux";
import { setApiary } from "../features/apiary/apiary.slice";
import React from "react";
import GoogleMaps from "./AutocompleteMaps.tsx";

const AddApiaryCard = () => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = React.useState();

  const [expand, setExpand] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
  });

  const { name } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const apiaryData = {
      name: name,
      location: {
        coordinates: [0, 0],
        formattedAddress: value.description,
        placeID: value.place_id,
      },
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
      <Collapse in={expand} sx={{ alignSelf: "center", px: 4 }}>
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
            <GoogleMaps value={value} setValue={setValue} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
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
