import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Fab, TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";

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

export default function BasicModalEdit({ handleUpdate, item, index }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemEdit, setItemEdit] = React.useState(item);

  function handleInp(e) {
    let value1 = e.target.value;
    console.log(value1, "value");
    setItemEdit({ todo: value1, edit: true });
  }

  return (
    <div>
      <Fab
        color="warning"
        aria-label="edit"
        variant="circle"
        onClick={handleOpen}
      >
        <EditIcon></EditIcon>
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {console.log(handleUpdate, "handleUpdate")}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TextField
              fullWidth
              id="standard-basic"
              label="New Todo"
              variant="standard"
              value={itemEdit.todo}
              onChange={(e) => handleInp(e)}
              sx={{ maxWidth: 100 + "%" }}
            />
          </Typography>
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
        </Box>
      </Modal>
    </div>
  );
}
