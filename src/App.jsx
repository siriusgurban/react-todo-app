import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";

import {
  Typography,
  Fab,
  Box,
  CardContent,
  CardActions,
  createTheme,
  Tooltip,
  LinearProgress,
  Hidden,
  Switch,
} from "@mui/material";
import Connection from "./components/Connection";
import AddInput from "./components/AddInput";
import Modal from "./components/Modal/index";
import ModalEdit from "./components/ModalEdit/index";
import { DeleteSharp } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";

import { amber, deepOrange, grey } from "@mui/material/colors";
import { Button } from "@mui/material";
import SwitchButton from "./components/SwitchButton";
import Mode from "./components/Mode";

import Notification from "./components/Notification";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState(0);

  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  // function to toggle the dark mode as true or false
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  // applying the primary and secondary theme colors
  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? "dark" : "light", // handle the dark mode state on toggle
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#131052",
      },
    },
  });

  useEffect(() => {
    if (todos.length <= 10) {
      setProgress(todos.length * 10);
    }
  }, [todos]);

  useEffect(() => {
    addEventListener("keypress", (e) => {
      e.key == "Enter" ? handleAdd() : "";
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      const storedList = JSON.parse(localStorage.getItem("todos"));
      setTodos(storedList);
    }
    if (localStorage.getItem("mode")) {
      const storedMode = JSON.parse(localStorage.getItem("mode"));
      setToggleDarkMode(storedMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("mode", JSON.stringify(toggleDarkMode));
  }, [todos, toggleDarkMode]);

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: amber,
            divider: amber[200],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });

  function handleInp(e) {
    let value1 = e.target.value;
    setTodo(value1);

    console.log(value1, "value");
  }

  function handleAdd() {
    if (todo.trim() === "") {
      console.log("fill input");
    } else {
      setTodos([...todos, todo]);
      setTodo("");
    }
  }

  function handleDelete(i) {
    setTodos(todos.filter((item, index) => i != index));
  }

  function handleDeleteAll() {
    setTodos([]);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      > */}

      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {console.log(todos, "todos")}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          {/* <SwitchButton onChange={toggleDarkTheme} /> */}
          <Tooltip title="Dark mode" placement="left">
            <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
          </Tooltip>
          <Connection />

          {/* <Mode /> */}
        </Box>

        <AddInput
          handleAdd={handleAdd}
          handleInp={(e) => handleInp(e)}
          todo={todo}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto",
            bgcolor: "background.default",
            color: "text.primary",
          }}
          maxHeight={800}
          minWidth={300}
        >
          {todos?.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  minWidth: 275,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10 + "px",
                }}
                maxWidth={1200}
              >
                <CardContent>
                  {/* <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 10 + "px",
                      }}
                    > */}
                  <Typography
                    sx={{
                      fontSize: 14,
                      width: "auto",
                    }}
                    color="text.primary"
                  >
                    {item}
                  </Typography>
                  {/* </Box> */}
                </CardContent>

                <CardActions>
                  <ModalEdit
                    item={item}
                    index={index}
                    todos={todos}
                    setTodos={setTodos}
                  />
                  <Tooltip title="Delete" placement="right">
                    <Fab
                      color="error"
                      aria-label="edit"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteSharp />
                    </Fab>
                  </Tooltip>
                </CardActions>
              </Box>
            );
          })}

          {todos.length == 0 ? "" : <Modal handleDeleteAll={handleDeleteAll} />}
        </Box>
      </Box>
      {/* </Box> */}
    </ThemeProvider>
  );
}

// export default function ToggleColorMode() {
//   const [mode, setMode] = React.useState("light");
//   const colorMode = React.useMemo(
//     () => ({
//       toggleColorMode: () => {
//         setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
//       },
//     }),
//     []
//   );

//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//         },
//       }),
//     [mode]
//   );

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <CssBaseline />
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <App />
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }
