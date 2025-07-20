import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Songs from "./pages/Songs";
import AddSong from "./pages/AddSong";
import EditSong from "./pages/EditSong";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";

const theme = {
  colors: {
    primary: "#8b5cf6",
    secondary: "#ec4899",
    danger: "#ef4444",
    text: "#1e293b",
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  },
};

const AppContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("https://img.freepik.com/premium-photo/glowing-earbuds-dark-background_1302-50645.jpg")
      center/cover no-repeat;
    opacity: 0.15;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContainer>
            <Routes>
              <Route path="/" element={<Songs />} />
              <Route path="/add" element={<AddSong />} />
              <Route path="/edit/:id" element={<EditSong />} />
            </Routes>
          </AppContainer>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
