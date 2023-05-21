import { Box, IconButton, useTheme, Typography, Avatar } from "@mui/material";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ColorModeContext, tokens } from "../theme";
import { logout, reset } from "../features/auth/auth.slice.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Topbar = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      px={2}
      py={2}
      pb={3}
      backgroundColor="background.default"
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 1,
      }}
    >
      <Box display="flex">
        <Typography
          variant="h1"
          color="primary.light"
          sx={{ m: "15px 0 5px 20px" }}
        >
          {title}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="left">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Avatar
              sx={{
                width: 36,
                height: 36,
                color: "onSecondary.main",
                bgcolor: "secondary.main",
                alignSelf: "center",
              }}
            >
              <LightModeOutlinedIcon />
            </Avatar>
          ) : (
            <Avatar
              sx={{
                width: 36,
                height: 36,
                color: "onSecondary.main",
                bgcolor: "secondary.main",
                alignSelf: "center",
              }}
            >
              <DarkModeOutlinedIcon />
            </Avatar>
          )}
        </IconButton>
        <IconButton>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              color: "onSecondary.main",
              bgcolor: "secondary.main",
              alignSelf: "center",
            }}
          >
            <NotificationsOutlinedIcon />
          </Avatar>
        </IconButton>
        <IconButton>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              color: "onSecondary.main",
              bgcolor: "secondary.main",
              alignSelf: "center",
            }}
          >
            <SettingsOutlinedIcon />
          </Avatar>
        </IconButton>
        <IconButton onClick={onLogout}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              color: "onSecondary.main",
              bgcolor: "secondary.main",
              alignSelf: "center",
            }}
          >
            <LogoutOutlinedIcon />
          </Avatar>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
