import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ColorModeContext, tokens } from "../theme";
import { logout, reset } from "../features/auth/auth.slice.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Topbar = () => {
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
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        <Typography
          variant="h1"
          color="primary.light"
          sx={{ m: "15px 0 5px 20px" }}
        >
          Beehive Monitor Dashboard
        </Typography>
      </Box>

      <Box display="flex" justifyContent="left">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon sx={{ color: "primary.light" }} />
          ) : (
            <DarkModeOutlinedIcon sx={{ color: "primary.light" }} />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon sx={{ color: "primary.light" }} />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon sx={{ color: "primary.light" }} />
        </IconButton>
        <IconButton>
          <LogoutOutlinedIcon
            onClick={onLogout}
            sx={{ color: "primary.light" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
