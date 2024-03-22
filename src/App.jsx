import { useState } from "react";
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

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState();
  const [mode, setMode] = useState("light");

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
          return { ...item, edit: false };
        }
      })
    );
    handleInp(e);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
          {console.log(todos, "todos")}
          <Connection />
          <AddInput
            handleAdd={handleAdd}
            handleInp={(e) => handleInp(e)}
            todo={todo}
          />
          <Button onClick={colorMode.toggleColorMode}>Switch</Button>
          {todos?.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  minWidth: 275,
                  maxWidth: 50 + "%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10 + "px",
                }}
              >
                {!item.edit ? (
                  <CardContent>
                    <Typography
                      fullWidth
                      sx={{
                        fontSize: 14,
                        // maxWidth: 50 + "%",
                      }}
                      color="text.primary"
                      gutterBottom
                    >
                      {item.todo}
                    </Typography>
                  </CardContent>
                ) : (
                  <input
                    type="text"
                    value={update}
                    onChange={(e) => handleInp(e)}
                  />
                )}
                <CardActions>
                  <Fab color="warning" aria-label="edit" variant="circle">
                    <EditIcon />
                  </Fab>
                  <Fab
                    color="error"
                    aria-label="edit"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteSharp />
                  </Fab>
                </CardActions>

                {/* <div onClick={() => handleEdit(index)}>Edit</div> */}
                {/* <div onClick={() => handleUpdate(index, item)}>Update</div> */}
              </Box>
            );
          })}
          {todos.length && (
            <Fab
              color="error"
              aria-label="edit"
              onClick={() => {
                setTodos([]);
              }}
            >
              <DeleteForever />
            </Fab>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
