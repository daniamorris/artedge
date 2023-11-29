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

export default function Privacy() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button color="secondary" onClick={handleOpen}>Privacy</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Privacy Policy
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="text.primary">
          This dapp uses Internet Identity, a privacy-enhancing blockchain-based authentication framework built on the Internet Computer.
          It is designed to work across all user devices and protect user privacy as a means to replace traditional usernames and passwords, which can be hard to manage and easy to exploit.
          No personal identifying information is needed to generate an anchor and as Internet Identity generates different pseudonyms for different applications, privacy is provided for users as interactions across dapps cannot be tracked.
          Any additional info you choose to add to this environment is optional and will not be sold or utilized elsewhere.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}