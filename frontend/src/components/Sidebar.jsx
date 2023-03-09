import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Sidebar as sb,
} from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  createTheme,
} from "@mui/material";

//import "react-pro-sidebar/dist/css/styles.css";
import "../custom.scss";
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
import {
  getApiaries,
  reset as apiaryReset,
} from "../features/apiary/apiary.slice";
import {
  getDevices,
  reset as deviceReset,
} from "../features/device/device.slice";

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
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const DeviceItem = ({ apiary, to, selected, setSelected }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { devices, isLoading, isError, message } = useSelector(
    (state) => state.device
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getDevices(apiary._id));
    return () => {
      dispatch(deviceReset());
    };
  }, [apiary._id, navigate, isError, message, dispatch]);

  return (
    <>
      {devices.length > 0 ? (
        <div className="devices">
          {devices.map((device) => (
            <MenuItem
              active={selected === device.name}
              sx={{
                color: "primary.light",
              }}
              onClick={() => setSelected(device.name)}
            >
              <Typography color="primary.light">{device.name}</Typography>
              <Link to={to} />
            </MenuItem>
          ))}
        </div>
      ) : (
        <Typography color="primary.light">Please add a device</Typography>
      )}
    </>
  );
};

const ApiaryMenu = ({ apiary, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <SubMenu
      rootStyles={{
        color: "primary.light",
        backgroundColor: "primary.dark",
      }}
      title={<Typography color="primary.light">{apiary.name}</Typography>}
    >
      <DeviceItem
        apiary={apiary}
        selected={selected}
        setSelected={setSelected}
      />
    </SubMenu>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Home");

  const { user } = useSelector((state) => state.auth);
  const { apiaries, isLoading, isError, message } = useSelector(
    (state) => state.apiary
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getApiaries());
    return () => {
      dispatch(apiaryReset());
    };
  }, [user, navigate, isError, message, dispatch]);

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
        "& .pro-sub-menu": {
          backgroundColor: "primary.dark",
        },
        "& .pro-inner-item:hover": {
          color: "selected.light",
        },
        "& .pro-menu-item.active": {
          color: "selected.main",
        },
        "& .pro-menu-item": {
          color: "primary.light",
        },
      }}
    >
      <ProSidebar
        defaultCollapsed={false}
        collapsed={isCollapsed}
        breakPoint="xs"
        collapsedWidth={80}
        width={240}
        backgroundColor={"primary.dark"}
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
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Menu iconShape="circle">
              <Item
                title="Home"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <SubMenu
                rootStyles={{
                  backgroundColor: "primary.dark",
                }}
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
              >
                {apiaries.length > 0 ? (
                  <div className="apiaries">
                    {apiaries.map((apiary) => (
                      <ApiaryMenu
                        apiary={apiary}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ))}
                  </div>
                ) : (
                  <Typography color="primary.light">
                    Please create an apiary
                  </Typography>
                )}
              </SubMenu>
              <Item
                title="FAQ"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Menu>
          </Box>
        </SidebarContent>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
