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
    ["Our Mission Statement", "Our motivation for this project is to ensure that bees are protected as their role to the environment is of utmost importance to the sustainability of our ecosystems. Our key principle for this project is to help beekeepers maintain their role as caretakers for the bees and hive by providing solutions that can be easily implemented and used in their field."],
    ["Our Commitment", "As students of the university, we are committed to providing an uncompromising standard of support to this project through learning, creativity, and development of skills in order to ensure the utmost quality of work is provided."],
    ["Santa Clara Mission Statement", "The University pursues its vision by creating an academic community that educates the whole person within the Jesuit, Catholic tradition, making student learning our central focus, continuously improving our curriculum and co-curriculum, strengthening our scholarship and creative work, and serving the communities of which we are a part in Silicon Valley and around the world."],
    ["More Information", "Github: https://github.com/paizcollin/beehive-webapp Research Document: https://drive.google.com/file/d/1Ble9ErteABF_nTk1ISFajrWrM6_Eq5KN/view?usp=sharing"],
    ["Special Thanks to", "Gerhard and Lisa Eschelbeck, Wendy Mather, and Kian Nikzad"],
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
