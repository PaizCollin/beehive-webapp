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
  Backdrop,
} from "@mui/material";
import "../custom.scss";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HiveOutlinedIcon from "@mui/icons-material/HiveOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiaries,
  reset as apiaryReset,
} from "../features/apiary/apiary.slice";

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

const DeviceItem = ({ device, to, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
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
  );
};

const ApiaryMenu = ({ apiary, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <SubMenu
      sx={{
        color: "primary.light",
        backgroundColor: "primary.dark",
      }}
      title={<Typography color="primary.light">{apiary.name}</Typography>}
    >
      {apiary.devices.length > 0 ? (
        <div className="devices">
          {apiary.devices.map((device) => (
            <DeviceItem
              key={device._id}
              device={device}
              selected={selected}
              setSelected={setSelected}
              to="/"
            />
          ))}
        </div>
      ) : (
        <Typography color="primary.light">Please add a device</Typography>
      )}
    </SubMenu>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
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
      //navigate("/");
    };
  }, [user, navigate, isError, message, dispatch]);

  if (!isCollapsed) {
    <Backdrop
      sx={{
        color: "secondary.main",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    />;
  }

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
      style={{
        position: "sticky",
        top: 0,
        height: "100%",
        zIndex: 2,
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        breakPoint="xs"
        collapsedWidth={80}
        width={240}
        position="fixed"
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
                sx={{
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
                        key={apiary._id}
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
                title="Manage"
                to="/manage"
                icon={<SettingsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="FAQ"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="About"
                to="/about"
                icon={<InfoOutlinedIcon />}
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
