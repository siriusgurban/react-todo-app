import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Fab, Box, Tooltip } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

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

export default function BasicModal({ handleDeleteAll }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Delete All" placement="right">
        <Fab color="error" aria-label="edit" onClick={handleOpen}>
          <DeleteForever />
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
            Are you sure to delete all todos?
          </Typography>

          <Tooltip title="Delete" placement="right">
            <Fab
              color="error"
              aria-label="edit"
              onClick={() => {
                handleDeleteAll();
                handleClose();
              }}
            >
              <DeleteForever />
            </Fab>
          </Tooltip>
        </Box>
      </Modal>
    </div>
  );
}
