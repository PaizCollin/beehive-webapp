import { Box, Grid, Typography, Avatar, useTheme } from "@mui/material";
import HiveOutlinedIcon from "@mui/icons-material/HiveOutlined";
import { tokens } from "../theme";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FAQCard from "../components/FAQCard";
import { toast } from "react-toastify";
import { Grow, Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

const Manage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useSelector((state) => state.auth);

  const faqs = [
    ["What is an apiary?", "answer"],
    ["What is a hive?", "answer"],
    ["How do I set up and use the hardware?", "answer"],
    ["How do I set up and use the software?", "answer"],
    ["Do I have to pay a subscription to use the software?", "answer"],
    ["Will there be continued support for this project?", "answer"],
    [
      "How is this different to the alternatives already on the market?",
      "answer",
    ],
    ["Where can I find the required hardware to use this service?", "answer"],
    ["How do I mount the device?", "answer"],
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
            <HelpOutlineOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h9" color={"primary.light"}>
            FAQ
          </Typography>
          <>
            <div className="faqs">
              {faqs.map((faq) => (
                <FAQCard faq={faq} />
              ))}
            </div>
          </>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Manage;
