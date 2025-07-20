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
    primary: "#3498db",
    secondary: "#2ecc71",
    danger: "#e74c3c",
    text: "#333",
    background: "#f5f5f5",
  },
};

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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
