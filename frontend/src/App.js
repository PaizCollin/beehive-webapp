import React from "react";
import { useState } from "react";
import Sticky from "react-sticky-el";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Manage from "./pages/Manage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <Router>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <div className="app">
                      <Sidebar isSidebar={isSidebar} />
                      <main className="content">
                        <Topbar />
                        <Dashboard />
                      </main>
                    </div>
                  </>
                }
              />
              <Route
                exact
                path="/manage"
                element={
                  <>
                    {
                      <div className="app">
                        <Sidebar isSidebar={isSidebar} />

                        <main className="content">
                          <Sticky>
                            <Topbar />
                          </Sticky>
                          <Manage />
                        </main>
                      </div>
                    }
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <div className="app">
                      <main className="content">
                        <Login />
                      </main>
                    </div>
                  </>
                }
              />
              <Route
                path="/register"
                element={
                  <>
                    <div className="app">
                      <main className="content">
                        <Register />
                      </main>
                    </div>
                  </>
                }
              />
            </Routes>

            <ToastContainer />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Router>
    </>
  );
}

export default App;
