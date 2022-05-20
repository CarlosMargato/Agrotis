import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import "./App.css";

import Landing from "./Pages/Landing";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Landing />
    </ThemeProvider>
  );
}

export default App;
