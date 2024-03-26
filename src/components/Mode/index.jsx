import { Switch } from "@mui/base";
import { CssBaseline } from "@mui/material";
import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export default function Mode() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CssBaseline />
      <div className="App" id={theme}>
        <div className="switch">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            name="antoine"
          />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
