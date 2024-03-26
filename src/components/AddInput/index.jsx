import { Box, Fab, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Notification from "../Notification";

function AddInput({ handleAdd, handleInp, todo }) {
  return (
    <Box style={{ display: "flex", justifyContent: "center", gap: 10 + "px" }}>
      <TextField
        fullWidth
        id="standard-basic"
        label="New Todo"
        variant="standard"
        value={todo}
        onChange={(e) => handleInp(e)}
        sx={{ maxWidth: 50 + "%" }}
      />
      <Tooltip title="Add" placement="right">
        <Fab color="primary" aria-label="add" onClick={handleAdd}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}

export default AddInput;
