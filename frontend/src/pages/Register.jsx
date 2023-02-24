import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/auth.slice.js";
import Spinner from "../components/Spinner";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import { tokens } from "../theme.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fade, Grow } from "@mui/material";

const Register = () => {
  // mui themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [trans, setTrans] = useState(true);

  const handleTrans = () => {
    setTrans((prev) => !prev);
  };

  // form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  // get form data from state
  const { name, email, password, password2 } = formData;

  // nav, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get state of auth
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        toastID: "registerError",
        hideProgressBar: true,
        theme: "colored",
      });
    }

    if (isSuccess || user) {
      handleTrans();
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // handle form changes
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match", {
        toastID: "passwordError",
        hideProgressBar: true,
        theme: "colored",
      });
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  // if loading -> spin
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grow in={trans}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Grid
              container
              spacing={0}
              alignItems="center"
              justify="center"
              style={{ minHeight: "80vh" }}
            >
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "primary.dark",
                  p: 4,
                  borderRadius: `24px`,
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h9" color={"neutral.light"}>
                  Sign Up
                </Typography>
                <Box
                  component="form"
                  onSubmit={onSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="name"
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={onChange}
                    autoFocus
                    variant={"filled"}
                    InputLabelProps={{
                      style: { color: colors.primary[100] },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={onChange}
                    variant={"filled"}
                    InputLabelProps={{
                      style: { color: colors.primary[100] },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onChange}
                    variant={"filled"}
                    InputLabelProps={{
                      style: { color: colors.primary[100] },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    autoComplete="current-password"
                    value={password2}
                    onChange={onChange}
                    variant={"filled"}
                    InputLabelProps={{
                      style: { color: colors.primary[100] },
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link
                        href="/login"
                        variant="body2"
                        color={"primary.light"}
                        onClick={handleTrans}
                      >
                        {"Already have an account? Sign In"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Container>
        </Grow>
      </ThemeProvider>
    </>
  );
};

export default Register;
