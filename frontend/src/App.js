import React from "react";
import { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Manage from "./pages/Manage";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
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
                        <Topbar title="Home" />
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
                        <Sidebar
                          isSidebar={isSidebar}
                          className="sticky-header"
                        />
                        <main className="content">
                          <Topbar title="Manage Apiaries" />
                          <Manage />
                        </main>
                      </div>
                    }
                  </>
                }
              />
              <Route
                exact
                path="/faq"
                element={
                  <>
                    {
                      <div className="app">
                        <Sidebar isSidebar={isSidebar} />

                        <main className="content">
                          <Topbar title="Frequently Asked Questions" />
                          <FAQ />
                        </main>
                      </div>
                    }
                  </>
                }
              />
              <Route
                exact
                path="/about"
                element={
                  <>
                    {
                      <div className="app">
                        <Sidebar isSidebar={isSidebar} />

                        <main className="content">
                          <Topbar title="About the Project" />
                          <About />
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
