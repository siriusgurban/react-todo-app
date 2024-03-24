import { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  Typography,
  Fab,
  Box,
  CardContent,
  CardActions,
  createTheme,
  Tooltip,
} from "@mui/material";
import Connection from "./components/Connection";
import AddInput from "./components/AddInput";
import { DeleteSharp } from "@mui/icons-material";
import Modal from "./components/Modal/index";
import ModalEdit from "./components/ModalEdit/index";
import { ThemeProvider } from "styled-components";
import { amber, deepOrange, grey } from "@mui/material/colors";
import { Button } from "@mui/material";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [mode, setMode] = useState("light");

  useEffect(() => {
    addEventListener("keypress", (e) => {
      e.key == "Enter" ? handleAdd() : "";
    });
  }, []);

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

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  function handleInp(e) {
    let value1 = e.target.value;
    setTodo(value1);

    console.log(value1, "value");
  }

  function handleAdd() {
    setTodos([...todos, todo]);
    setTodo("");
  }

  function handleDelete(i) {
    setTodos(todos.filter((item, index) => i != index));
  }

  function handleDeleteAll() {
    setTodos([]);
  }

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {console.log(todos, "todos")}
        <Connection />
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
          }}
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
              >
                <CardContent>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 10 + "px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                      color="text.primary"
                    >
                      {item}
                    </Typography>
                  </Box>
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
        </Box>

        {todos.length == 0 ? "" : <Modal handleDeleteAll={handleDeleteAll} />}
        <Button onClick={colorMode.toggleColorMode}>Switch</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
