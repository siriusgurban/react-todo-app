import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box, Fab, TextField, Tooltip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { useRef, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: 4,
  //   textAlign: "center",
};

export default function BasicModalEdit({ item, index, todos, setTodos }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemEdit, setItemEdit] = useState(item);

  function handleInp(e) {
    let value1 = e.target.value;
    console.log(value1, "value");
    setItemEdit(value1);
  }

  function handleUpdate(ind, ite) {
    let newValue = todos?.map((item, index) => {
      if (index === ind) {
        return ite;
      } else {
        return item;
      }
    });
    setTodos(newValue);
  }

  return (
    <div>
      <Tooltip title="Edit" placement="left">
        <Fab
          color="warning"
          aria-label="edit"
          variant="circle"
          onClick={() => {
            handleOpen();
          }}
        >
          <EditIcon></EditIcon>
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TextField
              fullWidth
              id="standard-basic"
              label="New Todo"
              variant="standard"
              value={itemEdit}
              onChange={(e) => handleInp(e)}
              sx={{ maxWidth: 100 + "%" }}
            />
          </Typography>
          <Tooltip title="Save" placement="right">
            <Fab
              color="success"
              aria-label="edit"
              onClick={() => {
                handleUpdate(index, itemEdit);
                handleClose();
              }}
            >
              <DoneIcon></DoneIcon>
            </Fab>
          </Tooltip>
        </Box>
      </Modal>
    </div>
  );
}
