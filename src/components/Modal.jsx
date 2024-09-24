import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  padding: '20px',
  boxShadow: '2px 2px 10px red',
  borderRadius: '8px',
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              type="text"
              placeholder="Enter Name"
              label="Name"
              variant="standard"
              fullWidth
              sx={{ marginBottom: 2 }} // Add space below the TextField
            />
            <TextField
              type="email"
              placeholder="Enter Email"
              label="Email"
              variant="standard"
              fullWidth
              sx={{ marginBottom: 2 }} // Add space below the TextField
            />
            <TextField
              type="password"
              placeholder="Enter Password"
              label="Password"
              variant="standard"
              fullWidth
              sx={{ marginBottom: 2 }} // Add space below the TextField
            />

            <Button variant="contained" fullWidth sx={{ marginBottom: 2 }}>
              Submit
            </Button>
            <Button variant="contained"  onClick={handleClose} fullWidth color="error">
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
