import { useState, useEffect, setState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/auth.slice.js";
import Loading from "../components/Loading";
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
import { Grow, Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [trans, setTrans] = useState(true);

  const handleTrans = () => {
    setTrans((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isChecked: true,
  });

  const { email, password, isChecked } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        toastID: "loginError",
        hideProgressBar: true,
        theme: "colored",
      });
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      isChecked: e.target.checked,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      isChecked,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return (
      <Fade in={isLoading}>
        <Backdrop
          sx={{
            color: "secondary.main",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Loading />
        </Backdrop>
      </Fade>
    );
  }

  return (
    <>
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "primary.dark",
                p: 4,
                borderRadius: `24px`,
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  m: 1,
                  color: "onSecondary.main",
                  bgcolor: "secondary.main",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h9" color={"primary.light"}>
                Sign in
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  autoFocus
                  onChange={onChange}
                  variant={"filled"}
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
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="secondary"
                      bgcolor="onSecondary.main"
                    />
                  }
                  label="Remember me"
                  onChange={onChange}
                  checked={isChecked}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    color: "onSecondary.main",
                    bgcolor: "secondary.main",
                    ":hover": {
                      color: "primary.light",
                    },
                  }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="#"
                      variant="body2"
                      color={"primary.light"}
                      onClick={handleTrans}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="/register"
                      variant="body2"
                      color={"primary.light"}
                      onClick={handleTrans}
                    >
                      {"Don't have an account? Sign up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Login;
