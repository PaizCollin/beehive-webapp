import {
  Box,
  Grid,
  Typography,
  Avatar,
  useTheme,
  createTheme,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import HiveOutlinedIcon from "@mui/icons-material/HiveOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DeviceHubOutlinedIcon from "@mui/icons-material/DeviceHubOutlined";
import { tokens } from "../theme";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getApiaries,
  reset as apiaryReset,
} from "../features/apiary/apiary.slice";
import UserCard from "../components/UserCard";
import DeviceCard from "../components/DeviceCard";
import ApiaryCard from "../components/ApiaryCard";
import AddApiaryCard from "../components/AddApiaryCard";
import { toast } from "react-toastify";
import { Grow, Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

const Manage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useSelector((state) => state.auth);
  const { apiaries, isLoading, isError, message } = useSelector(
    (state) => state.apiary
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        toastID: "manageError",
        hideProgressBar: true,
        theme: "colored",
      });
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getApiaries());

    return () => {
      dispatch(apiaryReset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return (
      <Fade in={isLoading}>
        <Backdrop
          sx={{
            color: "secondary.main",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Loading />
        </Backdrop>
      </Fade>
    );
  }

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      align="center"
      justifyContent="center"
      sx={{ minWidth: "500px", mt: 4 }}
    >
      <Grid item xs={11}>
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
            <HiveOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h9" color={"primary.light"}>
            Manage Apiaries
          </Typography>
          <>
            {apiaries.length > 0 ? (
              <div className="apiaries">
                {apiaries.map((apiary) => (
                  <ApiaryCard key={apiary._id} apiary={apiary} />
                ))}
              </div>
            ) : (
              <Typography color="primary.light">
                Please create an apiary
              </Typography>
            )}
          </>
          <AddApiaryCard />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Manage;
