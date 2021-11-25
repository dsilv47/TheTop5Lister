import { useContext } from 'react';
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';

export default function ErrorModal() {
    const { auth } = useContext(AuthContext);

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

    let open = false;
    if (auth.errorMessage) {
        open=true;
    }

    const handleClose = () => {
        auth.hideErrorMessage();
    }

    return (
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Alert severity="warning">{auth.errorMessage ? auth.errorMessage : ""}</Alert>
          <Button variant="contained" style={{margin: '0 auto', display: "flex"}} onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    );
}