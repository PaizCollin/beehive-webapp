import Topbar from "../components/Topbar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  createTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  getApiaries,
  reset as apiaryReset,
} from "../features/apiary/apiary.slice";

const src = "https://www.youtube.com/watch?v=h8SZV12pnmo";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mx="120px" my="40px">
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(4,1fr)",
          md: "repeat(8,1fr)",
          xl: "repeat(12,1fr)",
        }}
        gap="20px"
      >
        {/* LEFT/TOP */}
        <Box
          gridColumn={{
            xs: "span 4",
            md: "span 8",
            xl: "span 8",
          }}
          backgroundColor="primary.dark"
          alignItems="center"
          justifyContent="center"
        >
          {/* VIDEO FEED */}
          <video controls width="100%" src={src} type="video/mp4" />

          {/* CAMERA CONTROLS */}
          <Box
            gridColumn={{
              xs: "span 4",
              md: "span 8",
              xl: "span 4",
            }}
            backgroundColor="primary.dark"
            alignItems="center"
            justifyContent="center"
            display="flex"
            height="250px"
          >
            CONTROLS CONTROLS CONTROLS CONTROLS CONTROLS
          </Box>
        </Box>

        {/* RIGHT/BOTTOM */}
        <Box
          gridColumn={{
            xs: "span 4",
            md: "span 8",
            xl: "span 4",
          }}
          backgroundColor="transparent"
          alignItems="center"
          justifyContent="center"
        >
          {/* DASH 1 */}
          <Box
            gridColumn={{
              xs: "span 4",
              md: "span 8",
              xl: "span 4",
            }}
            backgroundColor="primary.dark"
            alignItems="center"
            justifyContent="center"
            display="flex"
            height="300px"
          >
            DASH 1
          </Box>

          {/* DASH 2 */}
          <Box
            gridColumn={{
              xs: "span 4",
              md: "span 8",
              xl: "span 4",
            }}
            backgroundColor="primary.dark"
            alignItems="center"
            justifyContent="center"
            display="flex"
            mt="20px"
            height="300px"
          >
            DASH 2
          </Box>

          {/* DASH 3 */}
          <Box
            gridColumn={{
              xs: "span 4",
              md: "span 8",
              xl: "span 4",
            }}
            backgroundColor="primary.dark"
            alignItems="center"
            justifyContent="center"
            display="flex"
            mt="20px"
            height="300px"
          >
            DASH 3
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
