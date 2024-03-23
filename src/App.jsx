import { useState, useEffect } from "react";
import * as React from "react";
import StyledMenu from "../src/components/Option/index";

import "./App.css";
import {
  TextField,
  Button,
  Typography,
  createTheme,
  Paper,
  Switch,
  CssBaseline,
  Container,
  Fab,
  Box,
  CardContent,
  CardActions,
} from "@mui/material";
import Connection from "./components/Connection";
import { ThemeProvider } from "styled-components";
import { amber, grey, deepOrange, red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import AddInput from "./components/AddInput";
import { DeleteForever, DeleteSharp } from "@mui/icons-material";
import Modal from "./components/Modal/index";
import ModalEdit from "./components/ModalEdit/index";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState();
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

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const colorMode = React.useMemo(
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
    console.log(value1, "value");
    setTodo(value1);
  }

  function handleAdd() {
    setTodos([...todos, { todo, edit: false }]);
    setTodo("");
  }

  function handleDelete(i) {
    setTodos(todos.filter((item, index) => i != index));
  }

  function handleDeleteAll() {
    setTodos([]);
  }

  function handleEdit(i) {
    setTodos(
      todos.map((item, index) => {
        if (index === i) {
          return { ...item, edit: !false };
        }
      })
    );
    setUpdate(
      todos.filter((item, index) => {
        if (index === i) {
          return item;
        }
      })[0].todo
    );
  }

  function handleUpdate(i, e) {
    setTodos(
      todos.map((item, index) => {
        if (index === i) {
          return { ...item, e };
        }
      })
    );
    // handleInp(e);
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
                {/* <CardContent> */}
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
                    {item.todo}
                  </Typography>
                </Box>
                {/* </CardContent> */}

                <CardActions>
                  <ModalEdit
                    handleUpdate={() => {
                      handleUpdate(index, item);
                    }}
                    item={item}
                    index={index}
                  />
                  <Fab
                    color="error"
                    aria-label="edit"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteSharp />
                  </Fab>
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
