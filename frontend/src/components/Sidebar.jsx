import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  createTheme,
} from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CloudIcon from "@mui/icons-material/Cloud";
import TimelineIcon from "@mui/icons-material/Timeline";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HiveOutlinedIcon from "@mui/icons-material/HiveOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";

const apiaries = [];

const MyItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      sx={{
        color: "primary.light",
      }}
      onClick={() => setSelected(title)}
      icon={
        <Avatar
          sx={{
            width: 36,
            height: 36,
            m: 1,
            color: "onSecondary.main",
            bgcolor: "secondary.main",
          }}
        >
          {icon}
        </Avatar>
      }
    >
      <Typography color="primary.light">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const MySubMenu = ({ title, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <SubMenu
      sx={{
        color: "primary.light",
      }}
      icon={icon}
      title={<Typography color="primary.light">{title}</Typography>}
    ></SubMenu>
  );
};

const Sidebar = () => {
  const navitage = useNavigate();
  const dispath = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Home");

  // const { user } = useSelector((state) => state.auth);
  // const { goals, isLoading, isError, message } = useSelector(
  //   (state) => state.apiaries
  // );

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          backgroundColor: "primary.dark",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "12px 35px 12px 20px !important",
        },
        "& .pro-sidebar-submenu": {
          backgroundColor: "primary.dark",
        },
        "& .pro-inner-item:hover": {
          color: "#000000 !important",
        },
        "& .pro-menu-item.active": {
          color: "#000000 !important",
        },
      }}
    >
      <ProSidebar
        defaultCollapsed={false}
        collapsed={isCollapsed}
        breakPoint="xs"
        collapsedWidth={80}
        width={240}
      >
        <Menu iconShape="circle">
          {/* Header and Button */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <MenuOutlinedIcon sx={{ color: "primary.light" }} />
              ) : undefined
            }
            style={{
              margin: "10px 0 20px 0",
              color: "neutral.light",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography color={"primary.light"}>Menu</Typography>
                <IconButton>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
        </Menu>

        <SidebarContent>
          <Menu iconShape="circle">
            <MyItem
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu
              title={
                <Typography variant="h6" color={"primary.light"}>
                  Apiaries
                </Typography>
              }
              icon={
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    m: 1,
                    color: "onSecondary.main",
                    bgcolor: "secondary.main",
                  }}
                >
                  <HiveOutlinedIcon />{" "}
                </Avatar>
              }
            ></SubMenu>
            <MyItem
              title="FAQ"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
