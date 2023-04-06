import { Box, Grid, Typography, Avatar, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AboutCard from "../components/AboutCard";
import { Grow, Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

const Manage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useSelector((state) => state.auth);

  const stmts = [
    ["Our Mission Statement", "answer"],
    ["About the Project", "answer"],
    ["Our Commitment", "answer"],
    ["Santa Clara Mission Statement", "answer"],
    ["More Information", "github, research doc, etc"],
    ["Special Thanks to", "advisors..."],
  ];

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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
            <InfoOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h9" color={"primary.light"}>
            About
          </Typography>
          <>
            <div className="stmts">
              {stmts.map((stmt) => (
                <AboutCard faq={stmt} />
              ))}
            </div>
          </>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Manage;
