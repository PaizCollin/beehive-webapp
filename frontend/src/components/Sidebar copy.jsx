import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CloudIcon from "@mui/icons-material/Cloud";
import TimelineIcon from "@mui/icons-material/Timeline";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      sx={{
        color: "primary.light",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography color="primary.light">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [disabledSubMenu, setdisabledSubMenu] = useState(false);
  const handleSidebar = () => {
    if (isCollapsed) {
      setIsCollapsed(!isCollapsed);
      setdisabledSubMenu(true);
    } else {
      setIsCollapsed(!isCollapsed);
      setdisabledSubMenu(false);
    }
  };
  const [selected, setSelected] = useState("Dashboard");

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
          padding: "5px 35px 5px 20px !important",
        },
      }}
    >
      <ProSidebar
        defaultCollapsed={false}
        collapsed={isCollapsed}
        breakPoint="xs"
        collapsedWidth={80}
        width={250}
      >
        <Menu iconShape="square">
          {/* Header and Button */}
          <MenuItem
            onClick={() => handleSidebar()}
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
                  <MenuOutlinedIcon sx={{ color: "primary.light" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon sx={{ color: "primary.light" }} />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu
              title={
                <Typography variant="h6" color={"primary.light"}>
                  Organizations
                </Typography>
              }
              icon={<AddIcon sx={{ color: "primary.light" }} />}
              disabled={disabledSubMenu}
            >
              <SubMenu
                title={
                  <Typography variant="h6" color={"primary.light"}>
                    Organizations
                  </Typography>
                }
                icon={<AddIcon sx={{ color: "primary.light" }} />}
                disabled={disabledSubMenu}
              >
                <Item
                  title="list orgs here"
                  to="/add"
                  icon={<AddIcon sx={{ color: "primary.light" }} />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
            </SubMenu>
            <Item
              title="list devices here"
              to="/settings"
              icon={<SettingsIcon sx={{ color: "primary.light" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="orgs"
              to="/settings"
              icon={<SettingsIcon sx={{ color: "primary.light" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="devices"
              to="/settings"
              icon={<SettingsIcon sx={{ color: "primary.light" }} />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
