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
    ["What is an apiary?", "An apiary is an organization with a unique name, a location, a device, and up to 10 members active in the organization."],
    ["What is a hive?", "A hive is structure that houses a colony of bees within a box to protect the bees from the elements and keep them thriving to produce honey, beeswax, pollen, and royal jelly."],
    ["How do I set up and use the hardware?", "You can set up the hardware by using a Raspberry Pi 4 Model B and a Raspberry Pi Camera Module V2 to mount on the bee hive."],
    ["How do I set up and use the software?", "You can set up the software by installing the machine learning model on the device itself which will then take the input from the camera and output it to the dashboard which will be hosted remotely on a server. You can then access this dashboard from a website which is where this page is hosted."],
    ["Do I have to pay a subscription to use the software?", "No, you do not need to pay a subscription fee to use the software because it is all open source and available for anyone to use."],
    ["Will there be continued support for this project?", "Yes, there will be continued support for this project as future Santa Clara University students contribute to this project."],
    ["How is this different to the alternatives already on the market?", "This is different from other alternatives because our software is open source which can be utilized by anyone. Also the software can be improved by anyone's contributions. This means that the software is entirely free and features can be added very easily."],
    ["Where can I find the required hardware to use this service?", "You can purchase the required hardware from any retailer that sells Raspberry Pi's such as Amazon or the Raspberry Pi website itself."],
    ["How do I mount the device?", "Due to the open source and configurable nature of the device, it can be mounted to the hive however the beekeeper wishes to. Idealy, the beekeeper should have the device fastened permanently with some enclosure surrounding the device such as a plexiglass box to protect it from the elements."],
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
