import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Terms() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button color="secondary" onClick={handleOpen}>Terms</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Terms of Service
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="text.primary">
          Live life on your own terms. We are not responsible for your results. This is an Alpha release and we make no promises. Everything could change and probably will, as is the nature of life, iterative processes, and expansion. Avoid being a jerk here and we will do our best to make this space useful and enjoyable. We might delete you on purpose or accidentally. You can leave at any time by deleting your profile. More terms live in the future.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}